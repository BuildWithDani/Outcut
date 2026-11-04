import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowSquareOut, CodeSquare, Documents } from "@/components/ui/icons";
import { SettingsGroup } from "@/components/video-editor/SettingsRow";
import { AppInfoGroup } from "@/components/video-editor/SettingsVisuals";
import { openExternalLink } from "@/components/video-editor/TutorialHelp";

const REPOSITORY = "https://github.com/BuildWithDani/Outcut";

const lineage = [
	{
		name: "Recordly",
		author: "webadderall",
		license: "AGPL-3.0",
		year: "2026",
		role: "The recorder and editor Outcut AI is derived from.",
		url: "https://github.com/webadderallorg/Recordly",
	},
	{
		name: "OpenScreen",
		author: "Siddharth Vaddem",
		license: "MIT",
		year: "2025",
		role: "The original project Recordly started as a fork of.",
		url: "https://github.com/siddharthvaddem/openscreen",
	},
];

const thirdParty = [
	{ name: "Voom", license: "MIT", use: "Share worker" },
	{ name: "Solar Icons", license: "CC BY 4.0", use: "Interface icons" },
	{ name: "DM Sans", license: "OFL 1.1", use: "Typeface" },
];

function open(url: string, label: string) {
	void openExternalLink(url, `Failed to open ${label}.`);
}

function LinkRow({
	title,
	meta,
	description,
	onOpen,
	leading,
}: {
	title: string;
	meta: string;
	description: string;
	onOpen: () => void;
	leading: ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onOpen}
			className="group flex w-full items-center gap-3.5 px-4 py-3 text-left transition-colors hover:bg-foreground/[0.035] focus-visible:bg-foreground/[0.05] focus-visible:outline-none"
		>
			{leading}
			<span className="min-w-0 flex-1">
				<span className="flex flex-wrap items-baseline gap-x-2">
					<span className="text-[13px] font-semibold text-foreground">{title}</span>
					<span className="truncate text-[11px] text-muted-foreground">{meta}</span>
				</span>
				<span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
					{description}
				</span>
			</span>
			<ArrowSquareOut className="size-4 shrink-0 text-muted-foreground opacity-50 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
		</button>
	);
}

/** The About page: app details plus Recordly and OpenScreen attribution. */
export function CreditsPanel() {
	const [version, setVersion] = useState<string>();
	useEffect(() => {
		let active = true;
		void window.electronAPI
			?.getAppVersion?.()
			.then((value) => active && setVersion(value))
			.catch(() => undefined);
		return () => {
			active = false;
		};
	}, []);

	return (
		<div className="space-y-6">
			<div className="relative overflow-hidden rounded-xl border border-[var(--settings-card-border)] bg-[var(--settings-card)] px-6 py-7 text-center">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-x-0 -top-28 mx-auto h-56 w-[460px] max-w-full rounded-full bg-[radial-gradient(closest-side,rgba(var(--outcut-accent-rgb),0.24),transparent)]"
				/>
				<img
					src={`${import.meta.env.BASE_URL}app-icons/outcut-128.png`}
					alt=""
					className="relative mx-auto size-16 rounded-[18px] shadow-[0_10px_30px_-8px_rgba(var(--outcut-accent-rgb),0.55)]"
				/>
				<h3 className="relative mt-4 text-xl font-semibold tracking-tight">Outcut AI</h3>
				<p className="relative mx-auto mt-1.5 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
					Outcut AI is free and open source under the AGPL-3.0 license.
				</p>
				<div className="relative mt-3 flex justify-center gap-1.5">
					{version && (
						<span className="rounded-full bg-foreground/[0.06] px-2.5 py-1 font-mono text-[11px] text-foreground/75">
							v{version}
						</span>
					)}
					<span className="rounded-full bg-accent/12 px-2.5 py-1 text-[11px] font-semibold text-accent">
						AGPL-3.0
					</span>
				</div>
				<div className="relative mt-5 flex justify-center gap-2">
					<Button
						variant="secondary"
						size="sm"
						className="gap-1.5"
						onClick={() => open(REPOSITORY, "source code")}
					>
						<CodeSquare className="size-4" />
						Source code
					</Button>
					<Button
						variant="ghost"
						size="sm"
						className="gap-1.5"
						onClick={() => open(`${REPOSITORY}/blob/main/NOTICE.md`, "notices")}
					>
						<Documents className="size-4" />
						Notices
					</Button>
				</div>
			</div>

			<AppInfoGroup title="App details" />

			<SettingsGroup title="Made by">
				<LinkRow
					title="BuildWithDani"
					meta="Maintainer"
					description="Outcut AI branding, design, documentation, and new features."
					onOpen={() => open("https://github.com/BuildWithDani", "BuildWithDani profile")}
					leading={
						<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[var(--outcut-logo-top)] to-[var(--outcut-logo-bottom)] text-[12px] font-bold text-white">
							BD
						</span>
					}
				/>
			</SettingsGroup>

			<SettingsGroup
				title="Built on"
				footer={
					<>
						BuildWithDani does not claim ownership of Recordly-derived or
						OpenScreen-derived code. Project files keep the{" "}
						<code className="rounded bg-foreground/[0.06] px-1 py-px font-mono text-[10px]">
							.recordly
						</code>{" "}
						format for compatibility.
					</>
				}
			>
				{lineage.map((project) => (
					<LinkRow
						key={project.name}
						title={project.name}
						meta={`${project.author} · ${project.license} · ${project.year}`}
						description={project.role}
						onOpen={() => open(project.url, `${project.name} repository`)}
						leading={
							<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground/[0.06] text-[13px] font-bold text-foreground/70">
								{project.name.charAt(0)}
							</span>
						}
					/>
				))}
			</SettingsGroup>

			<SettingsGroup title="Open-source components" footer="Thank you to every contributor.">
				{thirdParty.map((item) => (
					<div
						key={item.name}
						className="flex items-center justify-between gap-4 px-4 py-3"
					>
						<span className="min-w-0">
							<span className="block text-[13px] font-medium text-foreground">
								{item.name}
							</span>
							<span className="block text-xs text-muted-foreground">{item.use}</span>
						</span>
						<span className="shrink-0 rounded-full bg-foreground/[0.06] px-2.5 py-1 text-[11px] font-medium text-foreground/75">
							{item.license}
						</span>
					</div>
				))}
			</SettingsGroup>
		</div>
	);
}
