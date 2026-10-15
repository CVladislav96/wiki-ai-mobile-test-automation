import { $, browser } from "@wdio/globals";
import type { ArticleTitle } from "./ArticlePage.js";

class SearchPage {
  get searchTab() {
    return $("id=org.wikipedia:id/nav_tab_search");
  }

  get searchPromptCloseButton() {
    return $("~Close");
  }

  get searchCard() {
    return $("id=org.wikipedia:id/search_card");
  }

  get searchInput() {
    return $("id=org.wikipedia:id/search_src_text");
  }

  get navigateUp() {
    return $("~Navigate up");
  }

  get clearQueryButton() {
    return $("id=org.wikipedia:id/search_close_btn");
  }

  get exactSoftwareTestingResult() {
    return this.exactResult("Software testing");
  }

  get emptySearchInput() {
    return $(
      "//*[@resource-id='org.wikipedia:id/search_src_text' and @showing-hint='true']",
    );
  }

  get noResultsMessage() {
    return $("id=org.wikipedia:id/fragment_search_results").$(
      ".//android.widget.TextView[@text='No results']",
    );
  }

  async openSearch() {
    await this.searchTab.click();

    await browser.waitUntil(
      async () =>
        (await this.searchPromptCloseButton.isDisplayed()) ||
        (await this.searchCard.isDisplayed()),
      {
        timeout: 10000,
        timeoutMsg: "Search prompt or search card did not appear",
      },
    );

    if (await this.searchPromptCloseButton.isDisplayed()) {
      await this.searchPromptCloseButton.click();
    }

    await this.searchCard.waitForDisplayed();
    await this.searchCard.click();
    await this.searchInput.waitForDisplayed();
  }

  async enterSoftwareTestingQuery() {
    await this.enterQuery("Software testing");
  }

  async enterQuery(query: string) {
    await this.searchInput.setValue(query);
  }

  exactResult(title: ArticleTitle) {
    return $(
      `//android.view.View[@clickable='true'][.//android.widget.TextView[@text='${title}']]`,
    );
  }

  async waitForExactResult(title: ArticleTitle) {
    await this.exactResult(title).waitForDisplayed({
      timeout: 30000,
      timeoutMsg: `Exact search result "${title}" did not appear`,
    });
  }

  async openExactResult(title: ArticleTitle) {
    await this.waitForExactResult(title);
    await this.exactResult(title).click();
  }

  async waitForExactSoftwareTestingResult() {
    await this.waitForExactResult("Software testing");
  }

  async clearSearchQuery() {
    await this.clearQueryButton.click();
  }

  async searchForSoftwareTesting() {
    await this.enterSoftwareTestingQuery();
    await this.openExactResult("Software testing");
  }
}

export default new SearchPage();
