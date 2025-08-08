import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  requiredFieldErrorSelector = (field: string) =>
    `//input[@name='${field}']/ancestor::div[1]/following-sibling::span[text()='Required']`;

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'networkidle' });
  }

  async enterUsername(username: string) {
    await this.page.fill('input[name="username"]', username);
  }

  async enterPassword(password: string) {
    await this.page.fill('input[name="password"]', password);
  }

  async clickLogin() {
    await this.page.click('button[type="submit"]');
  }

  async assertDashboardVisible() {
  await expect(
    this.page.locator('h6:has-text("Dashboard")')
  ).toBeVisible({ timeout: 20000 });
}

  async assertErrorMessage(expected: string) {
    await expect(
      this.page.locator('.oxd-alert-content-text')
    ).toHaveText(expected, { timeout: 20000 });
  }


  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async waitForSessionTimeout(timeoutMs: number) {
    await this.page.waitForTimeout(timeoutMs);
  }

  async assertRedirectedToLogin() {
    await expect(this.page).toHaveURL(/.*auth\/login/);
  }

  async assertRequiredFieldError(selector: string) {
    const requiredElement = this.page.locator(this.requiredFieldErrorSelector(selector));
    await expect(requiredElement).toBeVisible();
  }
}
