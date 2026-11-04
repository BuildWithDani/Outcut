import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SettingsBadge, SettingsGroup, SettingsRow } from "@/components/video-editor/SettingsRow";

export function RecordingPermissionsSettings({ onReview }: { onReview?: () => void }) {
	const [status, setStatus] = useState<{
		mac: boolean;
		screen: boolean;
		accessibility: boolean;
	}>();
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState<string>();
	const refresh = useCallback(async () => {
		setBusy(true);
		try {
			const mac = (await window.electronAPI.getPlatform()) === "darwin";
			if (mac) {
				const [screen, accessibility] = await Promise.all([
					window.electronAPI.getScreenRecordingPermissionStatus(),
					window.electronAPI.getAccessibilityPermissionStatus(),
				]);
				if (!screen.success || !accessibility.success)
					throw new Error("Could not check permissions. Please try again.");
				setStatus({
					mac,
					screen: screen.status === "granted",
					accessibility: accessibility.trusted,
				});
			} else setStatus({ mac, screen: true, accessibility: true });
			setError(undefined);
		} catch (error) {
			setError(error instanceof Error ? error.message : String(error));
		} finally {
			setBusy(false);
		}
	}, []);
	useEffect(() => {
		void refresh();
		const check = () => void refresh();
		window.addEventListener("focus", check);
		return () => window.removeEventListener("focus", check);
	}, [refresh]);

	return (
		<div className="space-y-6">
			{!status && !error && (
				<p role="status" className="px-1 text-xs text-muted-foreground">
					Checking permissions…
				</p>
			)}
			{status?.mac && (
				<SettingsGroup
					title="System access"
					badge={
						<Button
							variant="ghost"
							size="sm"
							disabled={busy}
							onClick={() => void refresh()}
							className="h-7 px-2.5 text-xs"
						>
							Check again
						</Button>
					}
				>
					{[
						{
							title: "Screen Recording",
							description: "Capture your screen, windows and selected areas.",
							granted: status.screen,
						},
						{
							title: "Accessibility",
							description: "Track your cursor and highlight clicks.",
							granted: status.accessibility,
						},
					].map(({ title, description, granted }) => (
						<SettingsRow key={title} title={title} description={description}>
							<SettingsBadge dot tone={granted ? "success" : "warning"}>
								{granted ? "Allowed" : "Required"}
							</SettingsBadge>
						</SettingsRow>
					))}
				</SettingsGroup>
			)}
			{status && !status.mac && (
				<p className="px-1 text-xs leading-relaxed text-muted-foreground">
					Choose what to capture when you start a recording.
				</p>
			)}
			<SettingsGroup title="Devices">
				<SettingsRow
					title="Microphone and camera"
					description="Access is requested when you enable a microphone or camera for recording."
				>
					<SettingsBadge>Requested when needed</SettingsBadge>
				</SettingsRow>
			</SettingsGroup>
			{error && (
				<div className="flex items-center justify-between gap-4 rounded-xl border border-danger/25 bg-danger/[0.06] px-4 py-3">
					<p role="alert" className="text-xs text-danger">
						{error}
					</p>
					<Button
						variant="secondary"
						size="sm"
						disabled={busy}
						onClick={() => void refresh()}
					>
						Try again
					</Button>
				</div>
			)}
			{onReview && (
				<SettingsGroup title="Setup">
					<SettingsRow
						title="Permission setup"
						description="Review access and open system permission settings."
					>
						<Button variant="secondary" size="sm" onClick={onReview}>
							Review permissions
						</Button>
					</SettingsRow>
				</SettingsGroup>
			)}
		</div>
	);
}
