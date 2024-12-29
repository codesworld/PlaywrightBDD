import { Page, Locator } from "@playwright/test";

export class BasePage {
    protected page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }
    
    async waitFor(locator: Locator): Promise<void> {
      await locator.waitFor({ state: 'visible',timeout :5000});
  }
}