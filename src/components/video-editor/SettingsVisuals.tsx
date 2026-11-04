import { useEffect, useState } from "react";
import { SettingsGroup, SettingsRow } from "./SettingsRow";

type ThemeSwatchKind = "light" | "dark" | "system";

function MiniWindow({ tone }: { tone: "light" | "dark" }) {
	const light = tone === "light";
	return (
		<div
			className={`flex h-full w-full flex-col gap-1.5 p-2 ${light ? "bg-[#f6f6f7]" : "bg-[#1c1c1f]"}`}
		>
			<div className="flex gap-1">
				{["#ff5f57", "#febc2e", "#28c840"].map((color) => (
					<span
						key={color}
						className="size-1.5 rounded-full"
						style={{ background: color }}
					/>
				))}
			</div>
			<div className="flex flex-1 gap-1.5">
				<div className={`w-1/4 rounded ${light ? "bg-black/[0.06]" : "bg-white/[0.06]"}`} />
				<div className="flex flex-1 flex-col gap-1">
					<div className="h-1.5 w-2/3 rounded-full bg-[var(--outcut-accent)]" />
					<div
						className={`h-1.5 w-full rounded-full ${light ? "bg-black/[0.08]" : "bg-white/[0.1]"}`}
					/>
					<div
						className={`h-1.5 w-4/5 rounded-full ${light ? "bg-black/[0.08]" : "bg-white/[0.1]"}`}
					/>
				</div>
			</div>
		</div>
	);
}

/** A tiny app-window preview for the appearance picker. */
export function ThemeSwatch({ kind }: { kind: ThemeSwatchKind }) {
	return (
		<span
			aria-hidden
			className="relative block h-[58px] w-full overflow-hidden rounded-lg ring-1 ring-inset ring-[var(--settings-keycap-border)]"
		>
			{kind === "system" ? (
				<>
					<span className="absolute inset-0">
						<MiniWindow tone="light" />
					</span>
					<span className="absolute inset-0 [clip-path:polygon(55%_0,100%_0,100%_100%,45%_100%)]">
						<MiniWindow tone="dark" />
					</span>
				</>
			) : (
				<MiniWindow tone={kind} />
			)}
		</span>
	);
}

/** Read-only app details for support requests. */
export function AppInfoGroup({ title = "About" }: { title?: string }) {
	const [version, setVersion] = useState<string>();
	const [platform, setPlatform] = useState<string>();
	useEffect(() => {
		let active = true;
		void Promise.all([
			window.electronAPI.getAppVersion?.().catch(() => undefined),
			window.electronAPI.getPlatform?.().catch(() => undefined),
		]).then(([nextVersion, nextPlatform]) => {
			if (!active) return;
			setVersion(nextVersion);
			setPlatform(nextPlatform);
		});
		return () => {
			active = false;
		};
	}, []);
	const platformLabel =
		platform === "darwin"
			? "macOS"
			: platform === "win32"
				? "Windows"
				: platform === "linux"
					? "Linux"
					: platform;
	const value = (text?: string) => (
		<span className="font-mono text-xs text-foreground/75">{text ?? "—"}</span>
	);
	return (
		<SettingsGroup title={title}>
			<SettingsRow title="Version" description="The Outcut AI build you are running.">
				{value(version)}
			</SettingsRow>
			<SettingsRow title="Platform" description="Operating system reported by the app.">
				{value(platformLabel)}
			</SettingsRow>
		</SettingsGroup>
	);
}
