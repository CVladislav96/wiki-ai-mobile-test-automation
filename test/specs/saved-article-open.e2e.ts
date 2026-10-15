import { expect } from "@wdio/globals";
import ArticlePage from "../pageobjects/ArticlePage.js";
import CollectionsPage from "../pageobjects/CollectionsPage.js";
import WelcomePage from "../pageobjects/WelcomePage.js";
import { runWithCleanup } from "../utils/runWithCleanup.js";

describe("Wikipedia saved article navigation", () => {
  it("opens Software testing from the local Portfolio QA collection", async () => {
    let membershipAdded = false;

    await runWithCleanup(
      async () => {
        await WelcomePage.completeOnboarding();
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
});
