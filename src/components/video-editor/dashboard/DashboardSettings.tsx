import { CreditsPanel } from "@/components/credits/CreditsPanel";
import { SettingsSections, SettingsCategory } from "../SettingsSections";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { SettingsBadge, SettingsGroup, SettingsRow } from "../SettingsRow";
import { Switch } from "@/components/ui/switch";
import { supportsHudCaptureProtection } from "@/lib/hudCaptureProtection";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
export const DashboardSettingsContext = createContext<ReactNode>(null);

function PathChip({ path, placeholder }: { path: string; placeholder: string }) {
	return (
		<span
			className="mt-1 block max-w-full truncate rounded-md bg-foreground/[0.05] px-2 py-1 font-mono text-[11px] text-foreground/70"
			title={path || undefined}
		>
			{path || placeholder}
		</span>
	);
}

export function DashboardSettings({ onImportFile }: { onImportFile: () => Promise<void> }) {
	const settingsContent = useContext(DashboardSettingsContext);
	const [directory, setDirectory] = useState("");
	const [recordings, setRecordings] = useState("");
	const [hideHud, setHideHud] = useState(true);
	const [captureSupported, setCaptureSupported] = useState(false);
	const [busy, setBusy] = useState(false);
	const run = async (action: () => Promise<void>) => {
		setBusy(true);
		try {
			await action();
		} catch (error) {
			toast.error(String(error));
		} finally {
			setBusy(false);
		}
	};
	useEffect(() => {
		let active = true;
		void Promise.all([
			window.electronAPI.getRecordingsDirectory(),
			window.electronAPI.getHudOverlayCaptureProtection(),
			window.electronAPI.getPlatform(),
		])
			.then(([directory, protection, platform]) => {
				if (!active) return;
				if (directory.success) setRecordings(directory.path);
				if (protection.success) setHideHud(protection.enabled);
				setCaptureSupported(supportsHudCaptureProtection(platform));
			})
			.catch((error) => toast.error(String(error)));
		return () => {
			active = false;
		};
	}, []);
	return (
		<section aria-label="Dashboard settings" className="dashboard-settings max-w-5xl py-10">
			<div className="mb-9">
				<h1 className="text-[22px] font-semibold tracking-tight">Settings</h1>
				<p className="mt-1 text-[13px] text-muted-foreground">
					Customize how Outcut AI looks, records, and behaves.
				</p>
			</div>
			<SettingsSections
				layout="sidebar"
				categories={[
					"general",
					"account",
					"permissions",
					"motion",
					"recording",
					"files",
					"advanced",
					"about",
				]}
			>
				<SettingsCategory
					category={["general", "account", "permissions", "motion", "advanced"]}
				>
					{settingsContent}
				</SettingsCategory>
				<SettingsCategory category="recording">
					<SettingsGroup title="Storage">
						<SettingsRow
							title="Recordings folder"
							description={
								<span className="block min-w-0">
									<span className="block">New recordings are saved here.</span>
									<PathChip path={recordings} placeholder="Loading…" />
								</span>
							}
						>
							<Button
								variant="secondary"
								size="sm"
								disabled={busy}
								onClick={() =>
									void run(async () => {
										const result =
											await window.electronAPI.chooseRecordingsDirectory();
										if (result.canceled) return;
										if (!result.success || !result.path)
											throw Error("Could not change recordings folder");
										setRecordings(result.path);
									})
								}
							>
								Change folder
							</Button>
						</SettingsRow>
					</SettingsGroup>
					{captureSupported && (
						<SettingsGroup title="Privacy">
							<SettingsRow
								title="Hide HUD from recordings"
								description="Only while recording. The idle HUD stays visible in captures."
							>
								<Switch
									aria-label="Hide HUD from recordings"
									checked={hideHud}
									disabled={busy}
									onCheckedChange={(enabled) =>
										void run(async () => {
											const result =
												await window.electronAPI.setHudOverlayCaptureProtection(
													enabled,
												);
											if (!result.success)
												throw Error("Could not update capture protection");
											setHideHud(result.enabled);
										})
									}
								/>
							</SettingsRow>
						</SettingsGroup>
					)}
				</SettingsCategory>
				<SettingsCategory category="advanced">
					{import.meta.env.DEV && (
						<SettingsGroup
							title="Update preview"
							badge={<SettingsBadge tone="accent">DEV</SettingsBadge>}
						>
							<SettingsRow
								title="Preview update UI"
								description="Show the update toast without downloading anything."
							>
								<Button
									variant="secondary"
									size="sm"
									disabled={busy}
									onClick={() =>
										void run(async () => {
											await window.electronAPI.previewUpdateToast();
										})
									}
								>
									Preview
								</Button>
							</SettingsRow>
						</SettingsGroup>
					)}
				</SettingsCategory>
				<SettingsCategory category="about">
					<CreditsPanel />
				</SettingsCategory>
				<SettingsCategory category="files">
					<SettingsGroup
						title="Projects"
						footer="Named projects save automatically. Previews refresh when you return to Projects."
					>
						<SettingsRow
							title="Projects folder"
							description={
								<span className="block min-w-0">
									<span className="block">Where your named projects live.</span>
									<PathChip
										path={directory}
										placeholder="Click Show folder to reveal it"
									/>
								</span>
							}
						>
							<Button
								variant="secondary"
								size="sm"
								onClick={async () => {
									try {
										const result =
											await window.electronAPI.getProjectsDirectory();
										if (!result.success || !result.path)
											throw Error("Could not open projects folder");
										setDirectory(result.path);
										await window.electronAPI.revealInFolder(result.path);
									} catch (e) {
										toast.error(String(e));
									}
								}}
							>
								Show folder
							</Button>
						</SettingsRow>
						<SettingsRow
							title="Open video or project"
							description="Import a video file or open an existing .recordly project."
						>
							<Button
								variant="secondary"
								size="sm"
								disabled={busy}
								onClick={() => void run(onImportFile)}
							>
								Open file
							</Button>
						</SettingsRow>
					</SettingsGroup>
				</SettingsCategory>
			</SettingsSections>
		</section>
	);
}
