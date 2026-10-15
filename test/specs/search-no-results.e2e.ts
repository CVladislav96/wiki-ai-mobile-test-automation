import { expect } from "@wdio/globals";
import SearchPage from "../pageobjects/SearchPage.js";
import WelcomePage from "../pageobjects/WelcomePage.js";

describe("Wikipedia search with no matching results", () => {
  it("displays the no-results message for an unmatched query", async () => {
    await WelcomePage.completeOnboarding();
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
});
