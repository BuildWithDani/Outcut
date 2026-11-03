import fs from "node:fs";

const files = [
	"src/lib/auth/recordlyAuth.ts",
	"src/lib/exporter/exportSavePolicy.ts",
	"src/lib/exporter/modernVideoExporter.ts",
	"src/lib/feedback/exportErrorReporting.ts",
	"tests/ui/controls.tsx",
	"tests/ui/controls.html",
	"services/recordly-share/worker/src/media.js",
	"services/recordly-share/worker/web/src/components/SharePage.tsx",
	"services/recordly-share/worker/web/src/components/LibraryPage.tsx",
	"services/supabase/templates/confirm-sign-up.html",
	"services/supabase/templates/magic-link.html",
	"src/components/video-editor/videoPlayback/motionSmoothing.ts",
	"src/lib/exporter/modernVideoExporter.fallback.test.ts",
	"src/lib/auth/recordlyAuth.test.ts",
];

const pairs = [
	["Recordly Auth is not configured", "Outcut AI Auth is not configured"],
	["from Recordly, then open", "from Outcut AI, then open"],
	["from Recordly", "from Outcut AI"],
	["so Recordly can save", "so Outcut AI can save"],
	["and Recordly will not", "and Outcut AI will not"],
	["before Recordly could", "before Outcut AI could"],
	["Recordly version:", "Outcut AI version:"],
	["Recordly disables", "Outcut AI disables"],
	["Recordly controls", "Outcut AI controls"],
	["Recordly UI integration", "Outcut AI UI integration"],
	['content="Recordly"', 'content="Outcut AI"'],
	["— Recordly", "— Outcut AI"],
	[">Recordly<", ">Outcut AI<"],
	["in Recordly,", "in Outcut AI,"],
	["with Recordly.", "with Outcut AI."],
	["Sign in to Recordly", "Sign in to Outcut AI"],
	["your Recordly account", "your Outcut AI account"],
	["Welcome to Recordly.", "Welcome to Outcut AI."],
	["Recordly &middot;", "Outcut AI &middot;"],
	["Recordly<span", "Outcut AI<span"],
	["creating your Recordly", "creating your Outcut AI"],
	["to Recordly.", "to Outcut AI."],
	["for Recordly.", "for Outcut AI."],
	[
		"// Friendly reminder: Recordly is licensed under AGPL-3.0, author @webadderall, repo-> https://github.com/webadderall/Recordly",
		"// Friendly reminder: Outcut AI is AGPL-3.0 (derived from Recordly by webadderall / OpenScreen by Siddharth Vaddem). Repo-> https://github.com/BuildWithDani/Outcut",
	],
	['tracking-tight">Recordly</span>', 'tracking-tight">Outcut AI</span>'],
	["Recording unavailable — Outcut AI", "Recording unavailable — Outcut AI"],
];

for (const file of files) {
	if (!fs.existsSync(file)) {
		console.log("missing", file);
		continue;
	}
	let text = fs.readFileSync(file, "utf8");
	const original = text;
	for (const [from, to] of pairs) text = text.split(from).join(to);
	if (text !== original) {
		fs.writeFileSync(file, text);
		console.log("updated", file);
	} else {
		console.log("unchanged", file);
	}
}
