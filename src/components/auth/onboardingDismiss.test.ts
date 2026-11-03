import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../../..");

describe("dismissible onboarding", () => {
	it("allows Welcome to close without an account", () => {
		const controller = readFileSync(
			path.join(root, "src/components/auth/OnboardingController.tsx"),
			"utf8",
		);
		const dialog = readFileSync(
			path.join(root, "src/components/auth/RecordlySignInDialog.tsx"),
			"utf8",
		);
		expect(controller).toContain("allowDismissWithoutAccount");
		expect(controller).toContain("onContinueWithoutAccount");
		expect(controller).toContain("ONBOARDING_SEEN_KEY");
		expect(dialog).toContain("Continue without an account");
		expect(dialog).toContain("Close welcome dialog");
		expect(dialog).toContain("allowDismissWithoutAccount");
	});

	it("keeps Credits attribution accessible in the dashboard", () => {
		const sidebar = readFileSync(
			path.join(root, "src/components/video-editor/dashboard/DashboardSidebar.tsx"),
			"utf8",
		);
		const credits = readFileSync(
			path.join(root, "src/components/credits/CreditsDialog.tsx"),
			"utf8",
		);
		expect(sidebar).toContain("CreditsDialog");
		expect(credits).toContain("Recordly");
		expect(credits).toContain("OpenScreen");
	});
});
