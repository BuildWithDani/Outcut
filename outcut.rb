# Homebrew Cask template for Outcut AI.
# Maintainers publish filled-in casks from release automation; checksums and
# version pins are substituted when a GitHub Release exists.
#
# Compatibility note: project files remain `.recordly` on disk. Application
# Support paths use the "Outcut AI" product name from Electron userData.

cask "outcut-ai" do
  arch arm: "arm64", intel: "x64"

  version "1.4.0"
  sha256 arm:   "REPLACE_WITH_ARM64_DMG_SHA256",
         intel: "REPLACE_WITH_X64_DMG_SHA256"

  url "https://github.com/BuildWithDani/Outcut/releases/download/v#{version}/Outcut AI-#{arch}.dmg"
  name "Outcut AI"
  desc "Open-source screen recorder and video editor by BuildWithDani"
  homepage "https://github.com/BuildWithDani/Outcut"

  livecheck do
    url :url
    strategy :github_latest
  end

  app "Outcut AI.app"

  zap trash: [
    "~/Library/Application Support/Outcut AI",
    "~/Library/Preferences/ai.outcut.app.plist",
    "~/Library/Saved Application State/ai.outcut.app.savedState",
  ]
end
