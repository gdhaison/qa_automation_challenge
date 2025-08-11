import { After, Before, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { CustomWorld } from '../../world/world';
import { launchBrowser } from '../../helpers/browser.helper';
import fs from 'fs';
import path from 'path';

import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(20000);

Before(async function (this: CustomWorld) {
  await launchBrowser(this);
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    if (this.page) {
      const screenshotDir = path.join(process.cwd(), 'screenshots');
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
      }
      const filePath = path.join(
        screenshotDir,
        `${scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`
      );
      await this.page.screenshot({ path: filePath, fullPage: true });
      console.log(`📸 Screenshot saved: ${filePath}`);
    }
  }
});

