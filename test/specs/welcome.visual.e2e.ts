import { browser, expect } from "@wdio/globals";
import WelcomePage from "../pageobjects/WelcomePage.js";

describe("Wikipedia welcome screen visual", () => {
  it("matches the welcome screen baseline", async () => {
    await WelcomePage.heading.waitForDisplayed();
    await WelcomePage.forwardButton.waitForDisplayed();

    await expect(WelcomePage.heading).toHaveText(
      "All the world's knowledge",
    );

    const mismatchPercentage = await browser.checkScreen("wikipedia-welcome", {
      blockOutStatusBar: true,
      blockOutToolBar: true,
    });

    await expect(mismatchPercentage).toBe(0);
  });
});
