#!/usr/bin/env node
/**
 * Apply user-facing Outcut AI rebrand replacements.
 * Preserves .recordly extensions, storage keys, protocol internals, and code identifiers.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function walk(dir, filter) {
	const out = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (["node_modules", "release", "dist", "dist-electron", ".git"].includes(entry.name))
				continue;
			out.push(...walk(full, filter));
		} else if (filter(full)) {
			out.push(full);
		}
	}
	return out;
}

function replaceAll(text, pairs) {
	let next = text;
	for (const [from, to] of pairs) next = next.split(from).join(to);
	return next;
}

function updateFile(relOrAbs, pairs) {
	const file = path.isAbsolute(relOrAbs) ? relOrAbs : path.join(root, relOrAbs);
	if (!fs.existsSync(file)) {
		console.log("skip missing", path.relative(root, file));
		return false;
	}
	const original = fs.readFileSync(file, "utf8");
	const updated = replaceAll(original, pairs);
	if (updated !== original) {
		fs.writeFileSync(file, updated);
		console.log("updated", path.relative(root, file));
		return true;
	}
	console.log("unchanged", path.relative(root, file));
	return false;
}

const localeDirs = fs
	.readdirSync(path.join(root, "src/i18n/locales"), { withFileTypes: true })
	.filter((d) => d.isDirectory())
	.map((d) => d.name);

for (const loc of localeDirs) {
	const localeRoot = path.join("src/i18n/locales", loc);
	for (const file of fs.readdirSync(path.join(root, localeRoot))) {
		if (!file.endsWith(".json")) continue;
		updateFile(path.join(localeRoot, file), [["Recordly", "Outcut AI"]]);
	}
}

const uiPairs = [
	["Welcome to Recordly", "Welcome to Outcut AI"],
	["Sign into Recordly", "Sign into Outcut AI"],
	["Sign in to Recordly", "Sign in to Outcut AI"],
	["Your Recordly account", "Your Outcut AI account"],
	["Recordly account", "Outcut AI account"],
	["Allow Recordly to record", "Allow Outcut AI to record"],
	["News from Recordly", "News from Outcut AI"],
	["Recordly Projects folder", "Outcut AI Projects folder"],
	["Recordly support", "Outcut AI support"],
	["Recordly update", "Outcut AI update"],
	["restarting Recordly", "restarting Outcut AI"],
	["quit and reopen Recordly", "quit and reopen Outcut AI"],
	["doesn't break Recordly", "doesn't break Outcut AI"],
	["doesn’t break Recordly", "doesn’t break Outcut AI"],
	["Sign out of Recordly", "Sign out of Outcut AI"],
	["continue to Recordly", "continue to Outcut AI"],
	["with Recordly running", "with Outcut AI running"],
	["Recordly administrator", "Outcut AI administrator"],
	["enabled for Recordly", "enabled for Outcut AI"],
	["latest update of Recordly", "latest update of Outcut AI"],
	["version of Recordly", "version of Outcut AI"],
	["A new version of Recordly", "A new version of Outcut AI"],
	['title: "Recordly"', 'title: "Outcut AI"'],
	["title: 'Recordly'", "title: 'Outcut AI'"],
	[': "Recordly"', ': "Outcut AI"'],
	[">Recordly<", ">Outcut AI<"],
	['aria-label="Recordly"', 'aria-label="Outcut AI"'],
	["aria-label='Recordly'", "aria-label='Outcut AI'"],
	['t("app.name", "Recordly")', 't("app.name", "Outcut AI")'],
	['t("app.editorTitle", "Recordly Editor")', 't("app.editorTitle", "Outcut AI Editor")'],
	['getName: () => "Recordly"', 'getName: () => "Outcut AI"'],
	["Recordly Editor", "Outcut AI Editor"],
	["https://github.com/webadderallorg/Recordly/issues", "https://github.com/BuildWithDani/Outcut/issues"],
	["https://github.com/webadderallorg/Recordly", "https://github.com/BuildWithDani/Outcut"],
	["https://github.com/webadderall/Recordly", "https://github.com/BuildWithDani/Outcut"],
];

const targeted = [
	"src/App.tsx",
	"src/components/auth/OnboardingLayout.tsx",
	"src/components/auth/OnboardingPermissions.tsx",
	"src/components/auth/RecordlySignInDialog.tsx",
	"src/components/auth/AccountSettings.tsx",
	"src/components/video-editor/dashboard/DashboardSidebar.tsx",
	"src/components/video-editor/dashboard/sidebarCardConfig.ts",
	"src/components/video-editor/layout/EditorDialogs.tsx",
	"src/components/video-editor/layout/EditorSidebar.tsx",
	"src/components/video-editor/TutorialHelp.tsx",
	"src/components/feedback/ExportErrorReportButton.tsx",
	"src/components/launch/UpdateToastWindow.tsx",
	"electron/main.ts",
	"electron/windows.ts",
	"electron/ipc/register/sources.ts",
	"electron/ipc/register/sources.test.ts",
	"electron/ipc/register/recording.ts",
	"tests/ui/bridge.ts",
	"tests/ui/controls.tsx",
	"tests/ui/controls.html",
	"tests/ui/onboarding.spec.ts",
	"tests/ui/login.spec.ts",
	"tests/ui/clips-polish.spec.ts",
	"tests/ui/account-settings.spec.ts",
	"services/recordly-share/worker/src/media.js",
	"services/recordly-share/worker/web/src/components/ShareUI.tsx",
	"services/recordly-share/worker/README.md",
	"scripts/smoke-packaged-binaries.mjs",
	"scripts/verify-macos-distribution.mjs",
];

let changed = 0;
for (const file of targeted) {
	if (updateFile(file, uiPairs)) changed += 1;
}

// Tray tooltip and remaining literal product labels in electron/main.ts
updateFile("electron/main.ts", [
	[': "Recordly"', ': "Outcut AI"'],
	["= \"Recordly\"", "= \"Outcut AI\""],
	["`Recordly`", "`Outcut AI`"],
]);

updateFile("electron/windows.ts", [
	['title: "Recordly"', 'title: "Outcut AI"'],
]);

updateFile("src/App.tsx", [
	['"/app-icons/recordly-128.png"', '"/app-icons/outcut-128.png"'],
]);

updateFile("src/components/auth/OnboardingLayout.tsx", [
	["app-icons/recordly-128.png", "app-icons/outcut-128.png"],
]);

updateFile("src/components/auth/RecordlySignInDialog.tsx", [
	["app-icons/recordly-128.png", "app-icons/outcut-128.png"],
]);

updateFile("electron/main.ts", [
	['"recordlymac"', '"outcut"'],
	['"recordly"', '"outcut"'],
]);

updateFile("electron/windows.ts", [
	['"recordlymac-512.png"', '"outcut-512.png"'],
	['"recordly-512.png"', '"outcut-512.png"'],
]);

console.log(`UI rebrand pass complete. filesChanged=${changed}`);
