import { After, Before, BeforeAll } from '@cucumber/cucumber';
import { CustomWorld } from '../../world/world';

After(async function (this: CustomWorld) {
  if (this.browser) {
    await this.browser.close();
    this.browser = undefined;
    this.page = undefined;
    console.log('Closed browser after scenario');
  }
});
