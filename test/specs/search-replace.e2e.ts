import { expect } from "@wdio/globals";
import ArticlePage from "../pageobjects/ArticlePage.js";
import SearchPage from "../pageobjects/SearchPage.js";
import WelcomePage from "../pageobjects/WelcomePage.js";

describe("Wikipedia search query replacement", () => {
  it("opens the exact Computer science result after replacing the query", async () => {
    await WelcomePage.completeOnboarding();
    await SearchPage.openSearch();
    await SearchPage.enterSoftwareTestingQuery();
    await expect(SearchPage.searchInput).toHaveText("Software testing");
    await SearchPage.waitForExactResult("Software testing");

    await SearchPage.clearSearchQuery();
    await SearchPage.enterQuery("Computer science");
    await expect(SearchPage.searchInput).toHaveText("Computer science");
    await SearchPage.waitForExactResult("Computer science");
    await expect(SearchPage.exactResult("Computer science")).toBeDisplayed();

    await SearchPage.openExactResult("Computer science");
    await ArticlePage.waitForHeading("Computer science");
    await expect(ArticlePage.headingFor("Computer science")).toBeDisplayed();
    await expect(ArticlePage.headingFor("Computer science")).toHaveText(
      "Computer science",
    );
  });
});
