import { expect } from "@wdio/globals";
import ArticlePage from "../pageobjects/ArticlePage.js";
import SearchPage from "../pageobjects/SearchPage.js";
import WelcomePage from "../pageobjects/WelcomePage.js";

describe("Wikipedia article back navigation", () => {
  it("restores the original query and result", async () => {
    await WelcomePage.completeOnboarding();
    await SearchPage.openSearch();
    await SearchPage.enterSoftwareTestingQuery();
    await SearchPage.waitForExactResult("Software testing");
    await SearchPage.openExactResult("Software testing");

    await ArticlePage.waitForHeading("Software testing");
    await expect(ArticlePage.headingFor("Software testing")).toHaveText(
      "Software testing",
    );

    await ArticlePage.navigateUp.click();
    await expect(SearchPage.searchInput).toHaveText("Software testing");
    await SearchPage.waitForExactResult("Software testing");
    await expect(SearchPage.exactResult("Software testing")).toBeDisplayed();
  });
});
