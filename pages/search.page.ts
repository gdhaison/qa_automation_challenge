import { Page } from '@playwright/test';

export class SearchPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private ensurePage() {
    if (!this.page) throw new Error('Page not initialized');
  }

  async gotoSearchPage(): Promise<void> {
    this.ensurePage();
    await this.page.waitForSelector('h6:has-text("Dashboard")', { timeout: 60000 });
    await this.page.click('a[href*="viewPimModule"]');
    await this.page.waitForSelector('(//input[@placeholder="Type for hints..."])[1]', { timeout: 60000 });
  }

  async searchByName(name: string): Promise<void> {
    this.ensurePage();
    await this.page.locator('(//label[contains(.,"Employee Name")]/following::input[@placeholder="Type for hints..."])[1]').fill(name);
    await this.clickSearch();
    await this.page.waitForTimeout(3000);
  }

  async searchById(empId: string): Promise<void> {
    this.ensurePage();
    await this.page.locator('//label[contains(.,"Employee Id")]/following::input[1]').fill(empId);
    await this.clickSearch();
  }

  async searchBySupervisor(supervisor: string): Promise<void> {
    this.ensurePage();
    await this.page.locator('(//label[contains(.,"Supervisor Name")]/following::input[@placeholder="Type for hints..."])[1]').fill(supervisor);
    await this.clickSearch();
  }

  async searchByJobTitle(jobTitle: string): Promise<void> {
    this.ensurePage();
    await this.page.locator('//label[contains(.,"Job Title")]/following::div[contains(@class,"oxd-select-text-input")][1]').click();
    await this.page.locator(`//span[text()="${jobTitle}"]`).click();
    await this.clickSearch();
  }

  async searchBySubUnit(subUnit: string): Promise<void> {
    this.ensurePage();
    await this.page.locator('//label[contains(.,"Sub Unit")]/following::div[contains(@class,"oxd-select-text-input")][1]').click();
    await this.page.locator(`//*[text()="${subUnit}"]`).click();
    await this.clickSearch();
  }

  async searchByMultipleFilters(name: string, jobTitle: string, subUnit: string): Promise<void> {
    this.ensurePage();
    await this.searchByName(name);
    await this.searchByJobTitle(jobTitle);
    await this.searchBySubUnit(subUnit);

    await this.page.waitForTimeout(3000);
  }

  async clickSearch(): Promise<void> {
    this.ensurePage();
    await this.page.click('button[type="submit"]');
  }

  async getResultNames(): Promise<string[]> {
    this.ensurePage();
    return this.page.$$eval(
      '.oxd-table-body .oxd-table-card .oxd-table-cell:nth-child(3)',
      cells => cells.map(c => c.textContent?.trim() || '')
    );
  }

  async getResultSupervisors(): Promise<string[]> {
    this.ensurePage();
    return this.page.$$eval(
      '.oxd-table-body .oxd-table-card .oxd-table-cell:nth-child(4)',
      cells => cells.map(c => c.textContent?.trim() || '')
    );
  }

  async getResultJobTitles(): Promise<string[]> {
    this.ensurePage();
    return this.page.$$eval(
      '.oxd-table-body .oxd-table-card .oxd-table-cell:nth-child(5)',
      cells => cells.map(c => c.textContent?.trim() || '')
    );
  }

  async getResultSubUnits(): Promise<string[]> {
    this.ensurePage();

    return this.page.$$eval(
      '.oxd-table-body .oxd-table-card .oxd-table-cell:nth-child(7)',
      cells => cells.map(c => c.textContent?.trim() || '')
    );
  }

  async getResultCount(): Promise<number> {
    this.ensurePage();
    await this.page.waitForTimeout(3000);
    await this.page.screenshot({ path: `tada-${Date.now()}.png`, fullPage: true });
    return this.page.$$eval('.oxd-table-body .oxd-table-card', rows => rows.length);
  }

  async isNoResultDisplayed(): Promise<boolean> {
    this.ensurePage();
    return this.page.isVisible('//*[text()="No Records Found"]');
  }
}
