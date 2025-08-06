import { Page } from '@playwright/test';

export class WaitHelper {
  static async waitForElementVisible(page: Page, selector: string, timeout: number = 5000) {
    await page.waitForSelector(selector, { state: 'visible', timeout });
  }
}