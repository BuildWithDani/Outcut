import { Label, Description } from "@heroui/react";
import { createContext, useContext, type ReactNode } from "react";

const SettingsGroupContext = createContext(false);

/** One spacing and typography contract for editor and dashboard preferences. */
export function SettingsRow({
	title,
	description,
	children,
	stacked = false,
}: {
	title: ReactNode;
	description?: ReactNode;
	children: ReactNode;
	stacked?: boolean;
}) {
	const inGroup = useContext(SettingsGroupContext);
	const layout = stacked
		? "flex flex-col gap-3"
		: inGroup
			? "flex flex-col items-start gap-3 @[28rem]:flex-row @[28rem]:items-center @[28rem]:justify-between @[28rem]:gap-6"
			: "flex items-center justify-between gap-6";
	return (
		<section className={inGroup ? `${layout} px-4 py-3.5` : layout}>
			<div className="flex min-w-0 flex-col gap-1">
				<Label className="text-[13px] font-medium text-foreground">{title}</Label>
				{description && (
					<Description className="text-xs leading-relaxed text-muted-foreground">
						{description}
					</Description>
				)}
			</div>
			<div
				className={
					stacked
						? "w-full"
						: inGroup
							? "w-full @[28rem]:w-auto @[28rem]:shrink-0"
							: "shrink-0"
				}
			>
				{children}
			</div>
		</section>
	);
}

/** A titled card that stacks related settings rows with hairline dividers. */
export function SettingsGroup({
	title,
	description,
	badge,
	footer,
	children,
}: {
	title?: ReactNode;
	description?: ReactNode;
	badge?: ReactNode;
	footer?: ReactNode;
	children: ReactNode;
}) {
	return (
		<div className="flex flex-col gap-2">
			{(title || badge) && (
				<div className="flex items-end justify-between gap-3 px-1">
					<div className="min-w-0">
						{title && (
							<h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
								{title}
							</h3>
						)}
						{description && (
							<p className="mt-1 text-xs leading-relaxed text-muted-foreground">
								{description}
							</p>
						)}
					</div>
					{badge}
				</div>
			)}
			<SettingsGroupContext.Provider value>
				<div className="@container flex flex-col divide-y divide-[var(--settings-divider)] overflow-hidden rounded-xl border border-[var(--settings-card-border)] bg-[var(--settings-card)]">
					{children}
				</div>
			</SettingsGroupContext.Provider>
			{footer && (
				<div className="px-1 text-xs leading-relaxed text-muted-foreground">{footer}</div>
			)}
		</div>
	);
}

/** Pill for read-only states such as "Allowed" or "Beta". */
export function SettingsBadge({
	tone = "neutral",
	dot = false,
	children,
}: {
	tone?: "neutral" | "success" | "warning" | "accent";
	dot?: boolean;
	children: ReactNode;
}) {
	const tones = {
		neutral: "bg-foreground/[0.06] text-muted-foreground",
		success: "bg-success/10 text-success",
		warning: "bg-warning/10 text-warning",
		accent: "bg-accent/12 text-accent",
	} as const;
	const dots = {
		neutral: "bg-muted-foreground",
		success: "bg-success",
		warning: "bg-warning",
		accent: "bg-accent",
	} as const;
	return (
		<span
			className={`inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-semibold tracking-wide ${tones[tone]}`}
		>
			{dot && <span aria-hidden className={`size-1.5 rounded-full ${dots[tone]}`} />}
			{children}
		</span>
	);
}
