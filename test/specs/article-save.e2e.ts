import { expect } from "@wdio/globals";
import CollectionsPage from "../pageobjects/CollectionsPage.js";
import WelcomePage from "../pageobjects/WelcomePage.js";
import { runWithCleanup } from "../utils/runWithCleanup.js";

describe("Wikipedia article saving", () => {
  it("saves Software testing to the local Portfolio QA collection", async () => {
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
        await expect(
          CollectionsPage.softwareTestingArticleTitle,
        ).toHaveText("Software testing");
      },
      () => membershipAdded,
      () => CollectionsPage.cleanupAddedSoftwareTestingArticle(),
    );
  }).timeout(120000);
});
