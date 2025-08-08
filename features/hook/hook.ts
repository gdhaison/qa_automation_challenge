import { After, Before, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { CustomWorld } from '../../world/world';

import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(20000);

After(async function (this: CustomWorld) {
  if (this.browser) {
    await this.browser.close();
    this.browser = undefined;
    this.page = undefined;
    console.log('Closed browser after scenario');
  }
});

