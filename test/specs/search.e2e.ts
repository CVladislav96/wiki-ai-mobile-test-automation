import { expect } from "@wdio/globals";
import ArticlePage from "../pageobjects/ArticlePage.js";
import SearchPage from "../pageobjects/SearchPage.js";
import WelcomePage from "../pageobjects/WelcomePage.js";

describe("Wikipedia article search", () => {
  it("opens the exact-match Software testing article", async () => {
    await WelcomePage.completeOnboarding();
    await SearchPage.openSearch();
    await SearchPage.searchForSoftwareTesting();

    await ArticlePage.heading.waitForDisplayed({ timeout: 30000 });
    await expect(ArticlePage.heading).toBeDisplayed();
    await expect(ArticlePage.heading).toHaveText("Software testing");
  });
});
