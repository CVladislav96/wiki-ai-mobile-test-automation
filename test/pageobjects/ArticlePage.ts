import { $ } from "@wdio/globals";

export type ArticleTitle = "Software testing" | "Computer science";

class ArticlePage {
  get heading() {
    return this.headingFor("Software testing");
  }

  get saveButton() {
    return $("id=org.wikipedia:id/page_save");
  }

  get navigateUp() {
    return $("~Navigate up");
  }

  headingFor(title: ArticleTitle) {
    return $(
      `//android.widget.TextView[@text='${title}' and @heading='true']`,
    );
  }

  async waitForHeading(title: ArticleTitle) {
    await this.headingFor(title).waitForDisplayed({
      timeout: 30000,
      timeoutMsg: `Article heading "${title}" did not appear`,
    });
  }

  async openCollectionSelector() {
    await this.saveButton.click();
  }
}

export default new ArticlePage();
