import { useCallback, useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { loadAppSetting, saveAppSetting } from "@/lib/appSettings";
import { RecordlySignInDialog } from "./RecordlySignInDialog";

export const ONBOARDING_SEEN_KEY = "recordly.onboarding.v1.seen";

export function OnboardingController({
	requestNonce,
	ready,
	user,
	configured,
	callbackError,
}: {
	requestNonce: number;
	ready: boolean;
	user: User | null;
	configured: boolean;
	callbackError?: string;
}) {
	const [open, setOpen] = useState(false);
	const [startWithPermissions, setStartWithPermissions] = useState(false);
	const checked = useRef(false);

	useEffect(() => {
		if (requestNonce > 0) {
			setStartWithPermissions(true);
			setOpen(true);
		}
	}, [requestNonce]);

	const close = useCallback(() => {
		saveAppSetting("recordly.onboarding.permissionsRequested", false);
		setStartWithPermissions(false);
		setOpen(false);
	}, []);

	const dismiss = useCallback(() => {
		saveAppSetting(ONBOARDING_SEEN_KEY, true);
		close();
	}, [close]);

	useEffect(() => {
		if (!ready) return;
		if (checked.current) return;
		checked.current = true;
		if (loadAppSetting<boolean>("recordly.onboarding.permissionsRequested")) {
			setStartWithPermissions(true);
			setOpen(true);
			return;
		}
		if (!loadAppSetting<boolean>(ONBOARDING_SEEN_KEY)) {
			setOpen(true);
		}
	}, [ready]);

	useEffect(
		() =>
			window.electronAPI.onRecordingPermissionsRequested?.(() => {
				setStartWithPermissions(true);
				setOpen(true);
			}),
		[],
	);

	const finish = () => {
		saveAppSetting(ONBOARDING_SEEN_KEY, true);
		close();
		if (user) void window.electronAPI.showRecordingHud();
	};

	return (
		<RecordlySignInDialog
			onboarding
			allowDismissWithoutAccount
			startWithPermissions={startWithPermissions}
			variant="wide"
			open={open}
			onOpenChange={(value) => {
				if (!value) dismiss();
				else setOpen(true);
			}}
			user={user}
			configured={configured}
			callbackError={callbackError}
			onAuthenticated={finish}
			onContinueWithoutAccount={dismiss}
		/>
	);
}
