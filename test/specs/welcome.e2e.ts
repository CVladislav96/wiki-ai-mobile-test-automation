import { expect } from "@wdio/globals";
import WelcomePage from "../pageobjects/WelcomePage.js";

describe("Wikipedia welcome screen", () => {
  it("displays the welcome heading", async () => {
    await expect(WelcomePage.heading).toBeDisplayed();
    await expect(WelcomePage.heading).toHaveText("All the world's knowledge");
  });
});
