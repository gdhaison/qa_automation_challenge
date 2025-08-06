import { chromium, firefox, webkit, Browser, Page } from 'playwright';
import { CustomWorld } from '../world/world';

export async function launchBrowser(world: CustomWorld): Promise<Page> {
  let browser: Browser;

  process.stdout.write(`\nLaunching browser: ${process.env.BROWSER}\n`);

  process.stdout.write(`\nRunning tests with browser: ${world.browserType}\n`);

  const browserType = process.env.BROWSER || 'chromium';
  world.browserType = browserType; 

  switch (world.browserType) {
    case 'firefox':
      browser = await firefox.launch({ headless: false });
      break;
    case 'webkit':
      browser = await webkit.launch({ headless: false });
      break;
    default:
      browser = await chromium.launch({ headless: false });
  }

  const context = await browser.newContext();
  const page = await context.newPage();

  // lưu vào world để các step dùng lại
  world.browser = browser;
  world.page = page;

  return page;
}
