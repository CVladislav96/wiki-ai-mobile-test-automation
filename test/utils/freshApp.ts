import { browser } from "@wdio/globals";
import WelcomePage from "../pageobjects/WelcomePage.js";

/** Register inside a suite: reuse its fresh first session, reset for later tests. */
export function registerFreshAppSetup() {
  let initialSessionAvailable = true;

  beforeEach("start from fresh Wikipedia app data", async function () {
    this.timeout(120000);

    if (initialSessionAvailable) {
      initialSessionAvailable = false;
    } else {
      // Keep the configured noReset:false behavior even after a failed test.
      await browser.reloadSession();
    }

    await WelcomePage.completeOnboarding();
  });
}
