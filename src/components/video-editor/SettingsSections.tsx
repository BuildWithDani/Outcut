import { createContext, useContext, useState, type ComponentType, type ReactNode } from "react";
import { ChoiceGroup, ChoiceItem } from "@/components/ui/choice-group";
import {
	CpuBolt,
	FolderWithFiles,
	GearSix,
	Info,
	Running,
	ShieldCheck,
	UserCircle,
	VideoRecord,
} from "@/components/ui/icons";

type Category =
	| "general"
	| "account"
	| "permissions"
	| "motion"
	| "recording"
	| "files"
	| "advanced"
	| "about";
type CategoryIcon = ComponentType<{ className?: string; weight?: "regular" | "fill" }>;
const categoryMeta: Record<Category, { label: string; description: string; icon: CategoryIcon }> = {
	general: {
		label: "General",
		description: "Appearance, language, and keyboard shortcuts.",
		icon: GearSix,
	},
	account: {
		label: "Account",
		description: "Your profile, email, and sign-in methods.",
		icon: UserCircle,
	},
	permissions: {
		label: "Permissions",
		description: "System access Outcut AI needs to capture your screen.",
		icon: ShieldCheck,
	},
	motion: {
		label: "Motion",
		description: "How zooms and the camera move through your videos.",
		icon: Running,
	},
	recording: {
		label: "Recording",
		description: "Where recordings are saved and what they capture.",
		icon: VideoRecord,
	},
	files: {
		label: "Files",
		description: "Project storage and opening existing media.",
		icon: FolderWithFiles,
	},
	advanced: {
		label: "Advanced",
		description: "Update channel and developer tools.",
		icon: CpuBolt,
	},
	about: {
		label: "About",
		description: "Version, credits, and open-source licenses.",
		icon: Info,
	},
};
const SettingsCategoryContext = createContext<Category | null>(null);

/** Dashboard and editor share the same controls and category selection. */
export function SettingsSections({
	children,
	categories,
	layout = "tabs",
}: {
	children: ReactNode;
	categories: Category[];
	/** "sidebar" shows a vertical navigation with a section header for wide pages. */
	layout?: "tabs" | "sidebar";
}) {
	const parent = useContext(SettingsCategoryContext);
	const [selected, setSelected] = useState<Category>("general");
	if (parent) return <div className="space-y-6">{children}</div>;
	const active = categories.includes(selected) ? selected : categories[0];
	const meta = categoryMeta[active];
	const region = (
		<div role="region" aria-label={`${meta.label} settings`} className="space-y-6">
			{children}
		</div>
	);

	if (layout === "sidebar") {
		const ActiveIcon = meta.icon;
		return (
			<SettingsCategoryContext.Provider value={active}>
				<div className="flex items-start gap-10">
					<nav className="sticky top-0 w-52 shrink-0">
						<ChoiceGroup
							aria-label="Settings sections"
							value={active}
							onValueChange={(value) => setSelected(value as Category)}
							className="flex flex-col gap-0.5"
						>
							{categories.map((category) => {
								const { label, icon: Icon } = categoryMeta[category];
								const isActive = category === active;
								return (
									<ChoiceItem
										key={category}
										value={category}
										textValue={label}
										className="settings-nav-item !h-9 !w-full !justify-start !gap-2.5 !rounded-lg !border-0 !bg-transparent !px-2.5 text-[13px] font-medium !text-foreground/65 !shadow-none transition-colors hover:!bg-[var(--settings-nav-hover)] hover:!text-foreground data-[selected=true]:!bg-[var(--settings-nav-active)] data-[selected=true]:!text-foreground"
									>
										<Icon
											weight={isActive ? "fill" : "regular"}
											className={`size-[18px] shrink-0 ${isActive ? "text-accent" : ""}`}
										/>
										{label}
									</ChoiceItem>
								);
							})}
						</ChoiceGroup>
					</nav>
					<div className="min-w-0 max-w-[660px] flex-1">
						<header className="mb-7 flex items-center gap-3.5">
							<span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent ring-1 ring-inset ring-accent/20">
								<ActiveIcon weight="fill" className="size-5" />
							</span>
							<div className="min-w-0">
								<h2 className="text-[17px] font-semibold leading-tight tracking-tight">
									{meta.label}
								</h2>
								<p className="mt-0.5 text-[13px] text-muted-foreground">
									{meta.description}
								</p>
							</div>
						</header>
						{region}
					</div>
				</div>
			</SettingsCategoryContext.Provider>
		);
	}

	return (
		<SettingsCategoryContext.Provider value={active}>
			<div className="space-y-6">
				<ChoiceGroup
					aria-label="Settings sections"
					value={active}
					onValueChange={(value) => setSelected(value as Category)}
					size="sm"
				>
					{categories.map((category) => (
						<ChoiceItem key={category} value={category}>
							{categoryMeta[category].label}
						</ChoiceItem>
					))}
				</ChoiceGroup>
				{region}
			</div>
		</SettingsCategoryContext.Provider>
	);
}

export function SettingsCategory({
	category,
	children,
}: {
	category: Category | Category[];
	children: ReactNode;
}) {
	const active = useContext(SettingsCategoryContext);
	const visible = Array.isArray(category)
		? active !== null && category.includes(active)
		: active === category;
	return visible ? <div className="space-y-6">{children}</div> : null;
}
