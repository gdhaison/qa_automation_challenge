import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  async login(username: string, password: string) {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }

  async assertDashboardVisible() {
    await expect(this.page.locator('h6:has-text("Dashboard")')).toBeVisible();
  }

  async assertErrorMessage(expected: string) {
    await expect(this.page.locator('.oxd-alert-content-text')).toHaveText(expected);
  }
}
