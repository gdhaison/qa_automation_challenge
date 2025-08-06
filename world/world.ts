import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, Page } from 'playwright';

export class CustomWorld extends World {
  browser?: Browser;
  page?: Page;
  browserType: string = 'chromium';
  headless: boolean = false;

  constructor(options: IWorldOptions) {
    super(options);
    
    // this.browserType = process.env.BROWSER || 'chromium';
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
