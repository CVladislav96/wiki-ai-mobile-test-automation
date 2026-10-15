import { $ } from "@wdio/globals";

class WelcomePage {
  get heading() {
    return $(`android=new UiSelector().text("All the world's knowledge")`);
  }

  get forwardButton() {
    return $("~Forward");
  }

  get dataPrivacyHeading() {
    return $("//android.widget.TextView[@text='Data & Privacy']");
  }

  get languagesHeading() {
    return $(
      "//android.widget.TextView[@text='Read in more than 300 languages']",
    );
  }

  get curiosityHeading() {
    return $("//android.widget.TextView[@text='Follow your curiosity']");
  }

  get skipButton() {
    return $("//android.widget.TextView[@text='Skip']");
  }

  async completeOnboarding() {
    await this.heading.waitForDisplayed();

    await this.forwardButton.click();
    await this.dataPrivacyHeading.waitForDisplayed();

    await this.forwardButton.click();
    await this.languagesHeading.waitForDisplayed();

    await this.forwardButton.click();
    await this.curiosityHeading.waitForDisplayed();

    await this.skipButton.waitForDisplayed();
    await this.skipButton.click();
  }
}

export default new WelcomePage();
