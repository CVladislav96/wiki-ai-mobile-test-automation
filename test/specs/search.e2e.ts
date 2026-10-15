import { expect } from "@wdio/globals";
import ArticlePage from "../pageobjects/ArticlePage.js";
import SearchPage from "../pageobjects/SearchPage.js";
import { registerFreshAppSetup } from "../utils/freshApp.js";

describe("Wikipedia search", () => {
  registerFreshAppSetup();

  it("opens the exact-match Software testing article", async () => {
    await SearchPage.openSearch();
    await SearchPage.searchForSoftwareTesting();

    await ArticlePage.heading.waitForDisplayed({ timeout: 30000 });
    await expect(ArticlePage.heading).toBeDisplayed();
    await expect(ArticlePage.heading).toHaveText("Software testing");
  });

  it("clears the query and displays the search input hint", async () => {
    await SearchPage.openSearch();
    await SearchPage.enterSoftwareTestingQuery();

    await expect(SearchPage.searchInput).toHaveText("Software testing");
    await SearchPage.waitForExactSoftwareTestingResult();

    await SearchPage.clearSearchQuery();
    await expect(SearchPage.searchInput).toHaveText("Search Wikipedia");

    await SearchPage.emptySearchInput.waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "Search input did not display its placeholder",
    });
  });

  it("displays the no-results message for an unmatched query", async () => {
    await SearchPage.openSearch();
    await SearchPage.enterQuery("qzxvportfolio987654321");

    await expect(SearchPage.searchInput).toHaveText(
      "qzxvportfolio987654321",
    );

    await SearchPage.noResultsMessage.waitForDisplayed({
      timeout: 30000,
      timeoutMsg: "No-results message did not appear for the query",
    });
    await expect(SearchPage.noResultsMessage).toBeDisplayed();
    await expect(SearchPage.noResultsMessage).toHaveText("No results");
  });

  it("opens the exact Computer science result after replacing the query", async () => {
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

  it("restores the original query and result", async () => {
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
