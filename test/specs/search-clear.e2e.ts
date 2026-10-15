import SearchPage from "../pageobjects/SearchPage.js";
import WelcomePage from "../pageobjects/WelcomePage.js";

describe("Wikipedia search query clearing", () => {
  it("clears the query and displays the search input hint", async () => {
    await WelcomePage.completeOnboarding();
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
});
