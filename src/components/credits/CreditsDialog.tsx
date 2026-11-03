import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { openExternalLink } from "@/components/video-editor/TutorialHelp";

type CreditsDialogProps = {
	showLabel?: boolean;
	className?: string;
};

export function CreditsDialog({ showLabel = false, className }: CreditsDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" className={className} aria-label="Credits">
					{showLabel ? "Credits" : "Credits"}
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle>Credits</DialogTitle>
					<DialogDescription>
						Outcut AI is free and open source under the AGPL-3.0 license.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4 text-sm leading-relaxed text-foreground/80">
					<p>
						<strong className="text-foreground">Outcut AI</strong> is developed by{" "}
						<button
							type="button"
							className="underline underline-offset-2"
							onClick={() =>
								void openExternalLink(
									"https://github.com/BuildWithDani",
									"Failed to open BuildWithDani profile.",
								)
							}
						>
							BuildWithDani
						</button>
						. Independently authored Outcut additions will be identified in{" "}
						<code className="rounded bg-surface-secondary px-1 py-0.5 text-xs">
							NOTICE.md
						</code>
						.
					</p>
					<p>
						This application is derived from{" "}
						<strong className="text-foreground">Recordly</strong> by{" "}
						<button
							type="button"
							className="underline underline-offset-2"
							onClick={() =>
								void openExternalLink(
									"https://github.com/webadderallorg/Recordly",
									"Failed to open Recordly repository.",
								)
							}
						>
							webadderall
						</button>
						, which started as a fork of{" "}
						<strong className="text-foreground">OpenScreen</strong> by Siddharth Vaddem
						(2025). BuildWithDani does not claim ownership of Recordly-derived or
						OpenScreen-derived code.
					</p>
					<p>
						Project files continue to use the{" "}
						<code className="rounded bg-surface-secondary px-1 py-0.5 text-xs">
							.recordly
						</code>{" "}
						format for compatibility. See LICENSE.md, NOTICE.md, UPSTREAM.md, and
						THIRD_PARTY_NOTICES.md in the repository.
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
