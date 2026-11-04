import { useEffect, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { TextField, Label, Input } from "@heroui/react";
import { AccountAvatar, getAccountProfile } from "@/components/ui/account-avatar";
import { Button } from "@/components/ui/button";
import { SettingsBadge, SettingsGroup, SettingsRow } from "@/components/video-editor/SettingsRow";
import { requestAccountEmailChange, signOutOutcut, updateAccountName } from "@/lib/auth/outcutAuth";

const providerNames: Record<string, string> = {
	email: "Email magic link",
	google: "Google",
	azure: "Microsoft",
	github: "GitHub",
};

function profileName(user: User | null): string {
	const name = user?.user_metadata?.full_name ?? user?.user_metadata?.name;
	return typeof name === "string" ? name : "";
}

export function AccountSettings({ user }: { user: User | null }) {
	const [name, setName] = useState(() => profileName(user));
	const [email, setEmail] = useState(user?.email ?? "");
	const [busy, setBusy] = useState<string>();
	const [error, setError] = useState<string>();
	const [message, setMessage] = useState<string>();
	const savedName = profileName(user);
	useEffect(() => setName(savedName), [savedName]);
	useEffect(() => setEmail(user?.email ?? ""), [user?.email]);

	const run = async (action: string, work: () => Promise<void>) => {
		if (busy) return;
		setBusy(action);
		setError(undefined);
		setMessage(undefined);
		try {
			await work();
		} catch (error) {
			setError(error instanceof Error ? error.message : String(error));
		} finally {
			setBusy(undefined);
		}
	};
	const submitName = (event: FormEvent) => {
		event.preventDefault();
		void run("name", async () => {
			await updateAccountName(name);
			setMessage("Profile saved.");
		});
	};
	const submitEmail = (event: FormEvent) => {
		event.preventDefault();
		void run("email", async () => {
			const updated = await requestAccountEmailChange(email);
			setMessage(
				updated.email === email.trim()
					? "Email address updated."
					: "Check your current and new inboxes for confirmation instructions.",
			);
		});
	};

	if (!user) return <p className="text-sm text-muted">Sign in to manage your account.</p>;
	const profile = getAccountProfile(user);
	const providers = [
		...new Set([
			...(user.identities?.map((identity) => identity.provider) ?? []),
			...(Array.isArray(user.app_metadata.providers) ? user.app_metadata.providers : []),
		]),
	].filter((provider): provider is string => typeof provider === "string");
	const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
	return (
		<div className="space-y-6">
			<SettingsGroup>
				<div className="flex min-w-0 items-center gap-4 px-4 py-4">
					<AccountAvatar user={user} className="size-14 text-base" />
					<div className="min-w-0 flex-1">
						<p className="truncate text-[15px] font-semibold tracking-tight">
							{profile.name}
						</p>
						<p className="truncate text-xs text-muted-foreground" title={user.email}>
							{user.email}
						</p>
					</div>
					<span className="hidden @[26rem]:inline-flex">
						<SettingsBadge dot tone="success">
							Signed in
						</SettingsBadge>
					</span>
				</div>
			</SettingsGroup>
			<SettingsGroup title="Profile">
				<form
					onSubmit={submitName}
					className="flex flex-col gap-3 px-4 py-4 @[28rem]:flex-row @[28rem]:items-end"
					aria-label="Profile settings"
				>
					<TextField
						name="displayName"
						value={name}
						onChange={setName}
						isRequired
						isDisabled={Boolean(busy)}
						className="min-w-0 flex-1"
					>
						<Label>Display name</Label>
						<Input maxLength={80} autoComplete="name" className="w-full" />
					</TextField>
					<Button
						type="submit"
						variant="secondary"
						size="sm"
						className="shrink-0"
						disabled={
							Boolean(busy) || !name.trim() || name.trim() === profileName(user)
						}
					>
						{busy === "name" ? "Saving…" : "Save profile"}
					</Button>
				</form>
			</SettingsGroup>
			<SettingsGroup
				title="Email"
				footer="Confirm your new address by email before using it to sign in."
			>
				<form
					onSubmit={submitEmail}
					className="flex flex-col gap-3 px-4 py-4"
					aria-label="Email settings"
				>
					<div className="flex flex-col gap-3 @[28rem]:flex-row @[28rem]:items-end">
						<TextField
							name="email"
							type="email"
							value={email}
							onChange={setEmail}
							isRequired
							isDisabled={Boolean(busy)}
							className="min-w-0 flex-1"
						>
							<Label>Email address</Label>
							<Input autoComplete="email" className="w-full" />
						</TextField>
						<Button
							type="submit"
							variant="secondary"
							size="sm"
							className="shrink-0"
							disabled={
								Boolean(busy) ||
								!validEmail ||
								email.trim().toLowerCase() === user.email?.toLowerCase() ||
								email.trim() === user.new_email
							}
						>
							{busy === "email" ? "Sending…" : "Change email"}
						</Button>
					</div>
					{user.new_email && user.new_email !== user.email && (
						<p role="status" className="break-words text-xs text-warning">
							Awaiting confirmation: {user.new_email}
						</p>
					)}
				</form>
			</SettingsGroup>
			<SettingsGroup title="Security">
				<SettingsRow
					title="Sign-in methods"
					description="Methods connected to your account."
				>
					<ul className="flex flex-wrap gap-1.5" aria-label="Connected sign-in methods">
						{providers.map((provider) => (
							<li
								key={provider}
								className="rounded-full bg-foreground/[0.06] px-2.5 py-1 text-[11px] font-medium text-foreground/80"
							>
								{providerNames[provider] ?? provider}
							</li>
						))}
					</ul>
				</SettingsRow>
				<SettingsRow
					title="Sign out"
					description="Sign out of Outcut AI on all devices. Local projects stay on this computer."
				>
					<Button
						variant="destructive-soft"
						size="sm"
						disabled={Boolean(busy)}
						onClick={() => void run("signout", signOutOutcut)}
					>
						{busy === "signout" ? "Signing out…" : "Sign out"}
					</Button>
				</SettingsRow>
			</SettingsGroup>
			{message && (
				<p role="status" className="px-1 text-xs leading-relaxed text-success">
					{message}
				</p>
			)}
			{error && (
				<p role="alert" className="px-1 text-xs leading-relaxed text-danger">
					{error}
				</p>
			)}
		</div>
	);
}
