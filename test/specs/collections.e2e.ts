import { expect } from "@wdio/globals";
import ArticlePage from "../pageobjects/ArticlePage.js";
import CollectionsPage from "../pageobjects/CollectionsPage.js";
import { registerFreshAppSetup } from "../utils/freshApp.js";
import { runWithCleanup } from "../utils/runWithCleanup.js";

describe("Wikipedia collections", () => {
  registerFreshAppSetup();

  it("saves Software testing to the local Portfolio QA collection", async () => {
    let membershipAdded = false;

    await runWithCleanup(
      async () => {
        await CollectionsPage.prepareSoftwareTestingArticle(() => {
          membershipAdded = true;
        });

        await expect(
          CollectionsPage.softwareTestingArticleRow,
        ).toBeDisplayed();
        await expect(
          CollectionsPage.softwareTestingArticleTitle,
        ).toHaveText("Software testing");
      },
      () => membershipAdded,
      () => CollectionsPage.cleanupAddedSoftwareTestingArticle(),
    );
  }).timeout(120000);

  it("opens Software testing from the local Portfolio QA collection", async () => {
    let membershipAdded = false;

    await runWithCleanup(
      async () => {
        await CollectionsPage.prepareSoftwareTestingArticle(() => {
          membershipAdded = true;
        });

        await expect(
          CollectionsPage.softwareTestingArticleRow,
        ).toBeDisplayed();
        await CollectionsPage.softwareTestingArticleRow.click();
        await ArticlePage.waitForHeading("Software testing");
        await expect(
          ArticlePage.headingFor("Software testing"),
        ).toBeDisplayed();
        await expect(
          ArticlePage.headingFor("Software testing"),
        ).toHaveText("Software testing");
      },
      () => membershipAdded,
      () => CollectionsPage.cleanupAddedSoftwareTestingArticle(),
    );
  }).timeout(120000);

  it("removes Software testing from Portfolio QA", async () => {
    let membershipAdded = false;

    await runWithCleanup(
      async () => {
        await CollectionsPage.prepareSoftwareTestingArticle(() => {
          membershipAdded = true;
        });

        await expect(
          CollectionsPage.softwareTestingArticleRow,
        ).toBeDisplayed();

        await CollectionsPage.softwareTestingArticleRow.click();
        await ArticlePage.waitForHeading("Software testing");
        await ArticlePage.openCollectionSelector();
        await CollectionsPage.portfolioCollectionToggle.waitForDisplayed({
          timeout: 10000,
          timeoutMsg: "Portfolio QA was not available in the collection selector",
        });
        await expect(
          await CollectionsPage.isPortfolioQaSelected(),
        ).toBe(true);

        await CollectionsPage.portfolioCollectionToggle.click();
        await ArticlePage.navigateUp.click();
        await CollectionsPage.waitForSoftwareTestingArticleToBeAbsent();

        await expect(
          await CollectionsPage.isSoftwareTestingArticlePresent(),
        ).toBe(false);
      },
      () => membershipAdded,
      () => CollectionsPage.cleanupAddedSoftwareTestingArticle(),
    );
  }).timeout(120000);
});
