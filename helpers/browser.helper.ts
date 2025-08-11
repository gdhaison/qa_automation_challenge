import { chromium, firefox, webkit, Browser, Page } from 'playwright';
import { CustomWorld } from '../world/world';

export async function launchBrowser(world: CustomWorld): Promise<Page> {
  let browser: Browser;

  process.stdout.write(`\nLaunching browser: ${process.env.BROWSER}\n`);

  process.stdout.write(`\nRunning tests with browser: ${world.browserType}\n`);

  const browserType = process.env.BROWSER || 'chromium';
  world.browserType = browserType; 
  world.headless = process.env.HEADLESS === 'true' || false;
//   world.headless = false;

  switch (world.browserType) {
    case 'firefox':
      browser = await firefox.launch({ headless: world.headless });
      break;
    case 'webkit':
      browser = await webkit.launch({ headless: world.headless });
      break;
    default:
      browser = await chromium.launch({ headless: world.headless });
  }

  const context = await browser.newContext();
  const page = await context.newPage();

  // lưu vào world để các step dùng lại
  world.browser = browser;
  world.page = page;

  return page;
}
