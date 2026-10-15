import { $, $$, browser } from "@wdio/globals";
import ArticlePage from "./ArticlePage.js";
import SearchPage from "./SearchPage.js";

class CollectionsPage {
  get savedTab() {
    return $("id=org.wikipedia:id/nav_tab_reading_lists");
  }

  get collectionsTab() {
    return $(
      "//android.view.View[@clickable='true'][.//android.widget.TextView[@text='Collections']]",
    );
  }

  get portfolioCollectionRow() {
    return $(
      "//android.view.View[@clickable='true'][.//android.widget.TextView[@text='Portfolio QA']]",
    );
  }

  get portfolioCollectionToggle() {
    return $(
      "//android.view.View[@clickable='true' and @checkable='true'][.//android.widget.TextView[@text='Portfolio QA']]",
    );
  }

  get createCollectionRow() {
    return $(
      "//android.view.View[@clickable='true'][.//android.widget.TextView[@text='Create a new collection']]",
    );
  }

  get collectionNameInput() {
    return $("id=org.wikipedia:id/text_input");
  }

  get confirmCollectionButton() {
    return $("id=android:id/button1");
  }

  get collectionIntroGotItButton() {
    return $("id=org.wikipedia:id/buttonView");
  }

  get softwareTestingArticleRow() {
    return $(
      "//android.widget.FrameLayout[@clickable='true'][.//android.widget.TextView[@resource-id='org.wikipedia:id/page_list_item_title' and @text='Software testing']]",
    );
  }

  get softwareTestingArticleTitle() {
    return this.softwareTestingArticleRow.$(
      "id=org.wikipedia:id/page_list_item_title",
    );
  }

  get emptyCollectionMessage() {
    return $("id=org.wikipedia:id/reading_list_empty_text");
  }

  async openSavedCollections() {
    if (await SearchPage.searchInput.isDisplayed()) {
      await SearchPage.navigateUp.click();
      await this.savedTab.waitForDisplayed({ timeout: 10000 });
    }

    if (!(await this.collectionsTab.isDisplayed())) {
      await this.savedTab.waitForDisplayed({ timeout: 10000 });
      await this.savedTab.click();
    }

    await this.collectionsTab.waitForDisplayed({ timeout: 10000 });
    await this.collectionsTab.click();
  }

  async openPortfolioQa() {
    if (await this.collectionIntroGotItButton.isDisplayed()) {
      await this.collectionIntroGotItButton.click();
    }

    if (
      (await this.softwareTestingArticleRow.isDisplayed()) ||
      (await this.emptyCollectionMessage.isDisplayed()) ||
      (await this.hasCollectionArticleRows())
    ) {
      return;
    }

    await this.portfolioCollectionRow.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: 'Reading list "Portfolio QA" did not appear',
    });
    await this.portfolioCollectionRow.click();

    await browser.waitUntil(
      async () =>
        (await this.collectionIntroGotItButton.isDisplayed()) ||
        (await this.softwareTestingArticleRow.isDisplayed()) ||
        (await this.emptyCollectionMessage.isDisplayed()) ||
        (await this.hasCollectionArticleRows()),
      {
        timeout: 10000,
        timeoutMsg: 'Portfolio QA collection did not open',
      },
    );

    if (await this.collectionIntroGotItButton.isDisplayed()) {
      await this.collectionIntroGotItButton.click();
    }

    await browser.waitUntil(
      async () =>
        (await this.softwareTestingArticleRow.isDisplayed()) ||
        (await this.emptyCollectionMessage.isDisplayed()) ||
        (await this.hasCollectionArticleRows()),
      {
        timeout: 10000,
        timeoutMsg: 'Portfolio QA collection contents did not appear',
      },
    );
  }

  async prepareSoftwareTestingArticle(
    onMembershipAdded: () => void,
  ): Promise<boolean> {
    await this.openSavedCollections();

    if (await this.portfolioCollectionRow.isExisting()) {
      await this.openPortfolioQa();

      if (await this.softwareTestingArticleRow.isDisplayed()) {
        return false;
      }

      await ArticlePage.navigateUp.click();
    }

    await SearchPage.openSearch();
    await SearchPage.enterSoftwareTestingQuery();
    await SearchPage.waitForExactResult("Software testing");
    await SearchPage.openExactResult("Software testing");
    await ArticlePage.waitForHeading("Software testing");
    await ArticlePage.openCollectionSelector();

    await browser.waitUntil(
      async () =>
        (await this.portfolioCollectionToggle.isExisting()) ||
        (await this.createCollectionRow.isExisting()),
      {
        timeout: 10000,
        timeoutMsg: "Portfolio QA selection or collection creation was unavailable",
      },
    );

    if (await this.portfolioCollectionToggle.isExisting()) {
      const checked = await this.portfolioCollectionToggle.getAttribute(
        "checked",
      );
      if (checked !== "false") {
        throw new Error(
          `Expected Portfolio QA to be unchecked before adding Software testing; received "${checked}"`,
        );
      }

      await this.portfolioCollectionToggle.click();
      onMembershipAdded();
    } else {
      await this.createCollectionRow.click();
      await this.collectionNameInput.waitForDisplayed({ timeout: 10000 });
      await this.collectionNameInput.setValue("Portfolio QA");
      await this.confirmCollectionButton.waitForEnabled({
        timeout: 10000,
      });
      await this.confirmCollectionButton.click();
      onMembershipAdded();
    }

    await ArticlePage.waitForHeading("Software testing");
    await ArticlePage.navigateUp.click();
    await SearchPage.navigateUp.click();
    await this.openSavedCollections();
    await this.openPortfolioQa();
    await this.softwareTestingArticleRow.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Software testing was not added to Portfolio QA",
    });
    return true;
  }

  async isPortfolioQaSelected(): Promise<boolean> {
    const checked =
      await this.portfolioCollectionToggle.getAttribute("checked");
    if (checked === "true") {
      return true;
    }
    if (checked === "false") {
      return false;
    }
    throw new Error(
      `Portfolio QA selection did not expose a checked state: "${checked}"`,
    );
  }

  async countCollectionArticles(): Promise<number> {
    const titles = await $$("id=org.wikipedia:id/page_list_item_title");
    return titles.length;
  }

  async hasCollectionArticleRows(): Promise<boolean> {
    return (await this.countCollectionArticles()) > 0;
  }

  async isSoftwareTestingArticlePresent(): Promise<boolean> {
    return this.softwareTestingArticleRow.isExisting();
  }

  async waitForSoftwareTestingArticleToBeAbsent() {
    await browser.waitUntil(
      async () =>
        !(await this.softwareTestingArticleRow.isExisting()) &&
        ((await this.emptyCollectionMessage.isDisplayed()) ||
          (await this.hasCollectionArticleRows())),
      {
        timeout: 10000,
        timeoutMsg: "Software testing remained in Portfolio QA",
      },
    );
  }

  async cleanupAddedSoftwareTestingArticle() {
    if (await ArticlePage.heading.isDisplayed()) {
      await this.removeSoftwareTestingFromCurrentArticle();
      return;
    }

    if (
      !(await this.softwareTestingArticleRow.isDisplayed()) &&
      !(await this.emptyCollectionMessage.isDisplayed()) &&
      !(await this.hasCollectionArticleRows())
    ) {
      await this.openSavedCollections();
      if (await this.portfolioCollectionRow.isDisplayed()) {
        await this.openPortfolioQa();
      }
    }

    if (!(await this.softwareTestingArticleRow.isDisplayed())) {
      return;
    }

    await this.softwareTestingArticleRow.click();
    await ArticlePage.waitForHeading("Software testing");
    await this.removeSoftwareTestingFromCurrentArticle();
    await ArticlePage.navigateUp.click();
  }

  async removeSoftwareTestingFromCurrentArticle() {
    await ArticlePage.openCollectionSelector();
    await this.portfolioCollectionToggle.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Portfolio QA was not available in the collection selector",
    });

    const checked = await this.isPortfolioQaSelected();
    if (checked) {
      await this.portfolioCollectionToggle.click();
    }
  }
}

export default new CollectionsPage();
