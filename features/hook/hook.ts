import { After, Before, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { CustomWorld } from '../../world/world';
import { launchBrowser } from '../../helpers/browser.helper';

import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(20000);

Before(async function (this: CustomWorld) {
  await launchBrowser(this);
});

After(async function (this: CustomWorld) {
  if (this.browser) {
    await this.browser.close();
    this.browser = undefined;
    this.page = undefined;
    console.log('Closed browser after scenario');
  }
});

