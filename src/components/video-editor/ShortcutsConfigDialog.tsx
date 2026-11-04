import { Description, Modal } from "@heroui/react";
import { Keyboard, ArrowCounterClockwise as RotateCcw } from "@/components/ui/icons";
import { useCallback, useEffect, useState } from "react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useShortcuts } from "@/contexts/ShortcutsContext";
import {
	DEFAULT_SHORTCUTS,
	FIXED_SHORTCUTS,
	findConflict,
	formatBinding,
	SHORTCUT_ACTIONS,
	SHORTCUT_LABELS,
	type ShortcutAction,
	type ShortcutBinding,
	type ShortcutConflict,
	type ShortcutsConfig,
} from "@/lib/shortcuts";
import { useScopedT } from "../../contexts/I18nContext";

const MODIFIER_KEYS = new Set(["Control", "Shift", "Alt", "Meta"]);

export function ShortcutsConfigDialog() {
	const t = useScopedT("dialogs");
	const { shortcuts, isMac, isConfigOpen, closeConfig, setShortcuts, persistShortcuts } =
		useShortcuts();

	const [draft, setDraft] = useState<ShortcutsConfig>(shortcuts);
	const [captureFor, setCaptureFor] = useState<ShortcutAction | null>(null);
	const [conflict, setConflict] = useState<{
		forAction: ShortcutAction;
		pending: ShortcutBinding;
		conflictWith: ShortcutConflict;
	} | null>(null);

	useEffect(() => {
		if (isConfigOpen) {
			setDraft(shortcuts);
			setCaptureFor(null);
			setConflict(null);
		}
	}, [isConfigOpen, shortcuts]);

	useEffect(() => {
		if (!captureFor) return;

		const handleCapture = (e: KeyboardEvent) => {
			e.preventDefault();
			e.stopPropagation();

			if (e.key === "Escape") {
				setCaptureFor(null);
				return;
			}

			if (MODIFIER_KEYS.has(e.key)) return;

			const binding: ShortcutBinding = {
				key: e.key.toLowerCase(),
				...(e.ctrlKey || e.metaKey ? { ctrl: true } : {}),
				...(e.shiftKey ? { shift: true } : {}),
				...(e.altKey ? { alt: true } : {}),
			};

			const found = findConflict(binding, captureFor, draft);
			setCaptureFor(null);

			if (found?.type === "fixed") {
				toast.error(t("shortcutsConfig.reserved", undefined, { label: found.label }));
				return;
			}

			if (found?.type === "configurable") {
				setConflict({ forAction: captureFor, pending: binding, conflictWith: found });
				return;
			}

			setDraft((prev: ShortcutsConfig) => ({ ...prev, [captureFor]: binding }));
		};

		window.addEventListener("keydown", handleCapture, { capture: true });
		return () => window.removeEventListener("keydown", handleCapture, { capture: true });
	}, [captureFor, draft, t]);

	const handleSwap = useCallback(() => {
		if (!conflict || conflict.conflictWith.type !== "configurable") return;
		const { forAction, pending, conflictWith } = conflict;
		setDraft((prev: ShortcutsConfig) => ({
			...prev,
			[forAction]: pending,
			[conflictWith.action]: prev[forAction],
		}));
		setConflict(null);
	}, [conflict]);

	const handleCancelConflict = useCallback(() => setConflict(null), []);

	const handleSave = useCallback(async () => {
		setShortcuts(draft);
		await persistShortcuts(draft);
		toast.success(t("shortcutsConfig.saved"));
		closeConfig();
	}, [draft, setShortcuts, persistShortcuts, closeConfig, t]);

	const handleReset = useCallback(() => {
		setDraft({ ...DEFAULT_SHORTCUTS });
		toast.info(t("shortcutsConfig.resetNotice"));
	}, [t]);

	const handleClose = useCallback(() => {
		setCaptureFor(null);
		setConflict(null);
		closeConfig();
	}, [closeConfig]);

	const groupCard =
		"overflow-hidden rounded-xl border border-[var(--settings-card-border)] bg-[var(--settings-card)] divide-y divide-[var(--settings-divider)]";
	const groupTitle =
		"mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground";

	return (
		<Dialog
			open={isConfigOpen}
			onOpenChange={(open: boolean) => {
				if (!open) handleClose();
			}}
		>
			<DialogContent className="flex max-h-[85vh] max-w-[560px] flex-col gap-0 overflow-hidden p-0">
				<DialogHeader className="shrink-0 flex-row items-center gap-3.5 border-b border-[var(--settings-divider)] px-6 pb-4 pt-5">
					<span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent ring-1 ring-inset ring-accent/20">
						<Keyboard weight="fill" className="size-5" />
					</span>
					<div className="min-w-0">
						<DialogTitle className="text-[17px] font-semibold tracking-tight">
							{t("shortcutsConfig.title")}
						</DialogTitle>
						<Description className="mt-0.5 text-xs text-muted-foreground">
							{t("shortcutsConfig.instructions")}
						</Description>
					</div>
				</DialogHeader>

				<Modal.Body className="min-h-0 space-y-6 overflow-y-auto px-6 py-5">
					<section>
						<h3 className={groupTitle}>{t("shortcutsConfig.configurable")}</h3>
						<div className={groupCard}>
							{SHORTCUT_ACTIONS.map((action) => {
								const isCapturing = captureFor === action;
								const hasConflict = conflict?.forAction === action;
								return (
									<div key={action}>
										<div className="flex items-center justify-between gap-4 py-1.5 pl-4 pr-2">
											<span className="text-[13px] font-medium text-foreground">
												{SHORTCUT_LABELS[action]}
											</span>
											<button
												type="button"
												aria-label={
													isCapturing
														? `${SHORTCUT_LABELS[action]}: ${t("shortcutsConfig.pressAKey")}`
														: `Change ${SHORTCUT_LABELS[action]} shortcut, currently ${formatBinding(draft[action], isMac)}`
												}
												onClick={() => {
													setConflict(null);
													setCaptureFor(isCapturing ? null : action);
												}}
												title={
													isCapturing
														? t("shortcutsConfig.pressEscToCancel")
														: t("shortcutsConfig.clickToChange")
												}
												className={[
													"flex h-9 min-w-[112px] select-none items-center justify-center gap-1 rounded-lg px-2 transition-[background-color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
													isCapturing
														? "bg-accent/10 ring-2 ring-accent"
														: hasConflict
															? "bg-warning/10 ring-1 ring-warning/50"
															: "hover:bg-foreground/[0.05]",
												].join(" ")}
											>
												{isCapturing ? (
													<span className="flex items-center gap-2 px-1 text-xs font-medium text-accent">
														<span
															aria-hidden
															className="size-1.5 animate-pulse rounded-full bg-accent"
														/>
														{t("shortcutsConfig.pressAKey")}
													</span>
												) : (
													<KeyCombo
														value={formatBinding(draft[action], isMac)}
													/>
												)}
											</button>
										</div>
										{hasConflict &&
											conflict?.conflictWith.type === "configurable" && (
												<div className="mx-3 mb-3 flex items-center justify-between gap-3 rounded-lg border border-warning/25 bg-warning/[0.08] py-1.5 pl-3 pr-1.5 text-xs">
													<span className="text-warning">
														{t(
															"shortcutsConfig.alreadyUsedBy",
															undefined,
															{
																action: SHORTCUT_LABELS[
																	conflict.conflictWith.action
																],
															},
														).replace(/<\/?strong>/g, "")}
													</span>
													<div className="flex shrink-0 gap-1">
														<Button
															variant="ghost"
															size="sm"
															type="button"
															onClick={handleCancelConflict}
															className="h-7 px-2.5 text-xs"
														>
															{t("shortcutsConfig.cancel")}
														</Button>
														<Button
															variant="secondary"
															size="sm"
															type="button"
															onClick={handleSwap}
															className="h-7 px-2.5 text-xs"
														>
															{t("shortcutsConfig.swap")}
														</Button>
													</div>
												</div>
											)}
									</div>
								);
							})}
						</div>
					</section>

					<section>
						<h3 className={groupTitle}>{t("shortcutsConfig.fixed")}</h3>
						<div className={groupCard}>
							{FIXED_SHORTCUTS.map(({ label, display }) => (
								<div
									key={label}
									className="flex items-center justify-between gap-4 py-1.5 pl-4 pr-2"
								>
									<span className="text-[13px] text-foreground/80">{label}</span>
									<span className="flex h-9 min-w-[112px] items-center justify-center px-2">
										<KeyCombo value={display} muted />
									</span>
								</div>
							))}
						</div>
					</section>
				</Modal.Body>

				<DialogFooter className="mt-0 flex shrink-0 items-center gap-2 border-t border-[var(--settings-divider)] bg-foreground/[0.02] px-6 py-3.5 sm:justify-between">
					<Button
						title={t("shortcutsConfig.resetToDefaults")}
						variant="ghost"
						size="sm"
						className="max-w-[200px] gap-1.5 text-muted-foreground"
						onClick={handleReset}
					>
						<RotateCcw className="size-3.5" />
						<span className="truncate">{t("shortcutsConfig.resetToDefaults")}</span>
					</Button>
					<div className="flex gap-2">
						<Button variant="ghost" size="sm" onClick={handleClose}>
							{t("shortcutsConfig.cancel")}
						</Button>
						<Button size="sm" onClick={handleSave}>
							{t("shortcutsConfig.save")}
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

/** Renders "⌘ + D" as individual keycaps, and "Del / ⌫" as alternatives. */
function KeyCombo({ value, muted = false }: { value: string; muted?: boolean }) {
	const alternatives = value.split(/\s+\/\s+/);
	return (
		<span className="flex items-center gap-1">
			{alternatives.map((combo, comboIndex) => (
				<span key={combo} className="flex items-center gap-1">
					{comboIndex > 0 && (
						<span className="px-0.5 text-[11px] text-muted-foreground">or</span>
					)}
					{combo
						.split(/\s*\+\s*/)
						.filter(Boolean)
						.map((key, index) => (
							<kbd
								key={`${key}-${index}`}
								className={`inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-b-2 border-[var(--settings-keycap-border)] bg-[var(--settings-keycap)] px-1.5 font-sans text-[11px] font-semibold leading-none ${muted ? "text-foreground/65" : "text-foreground"}`}
							>
								{key}
							</kbd>
						))}
				</span>
			))}
		</span>
	);
}
