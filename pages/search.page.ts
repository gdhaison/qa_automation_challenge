import { Page } from '@playwright/test';

export class SearchPage {
  constructor(private page: Page) {}

  async gotoSearchPage() {
    // Wait for dashboard to be visible before clicking PIM
    await this.page.waitForSelector('h6:has-text("Dashboard")', { timeout: 60000 });
    await this.page.click('a[href="/web/index.php/pim/viewPimModule"]');
    await this.page.waitForSelector('input[@class="Type for hints..."]', { timeout: 60000 });
    // sleep 3s
    await this.page.waitForTimeout(3000); // Adjust as needed
    await this.page.screenshot({ path: 'screenshot.png' });
  }

  async searchByName(name: string) {
    await this.page.fill('input[placeholder="Type for hints..."]', name);
    await this.page.click('button[type="submit"]');
    await this.page.waitForLoadState('networkidle');
  }

  async searchById(id: string) {
    await this.page.fill('input[name="empsearch[id]"]', id);
    await this.page.click('button[type="submit"]');
    await this.page.waitForLoadState('networkidle');
  }

  async searchWithoutCriteria() {
    await this.page.click('button[type="submit"]');
    await this.page.waitForLoadState('networkidle');
  }

  async searchByJobTitle(title: string) {
    await this.page.selectOption('select[name="empsearch[job_title]"]', { label: title });
    await this.page.click('button[type="submit"]');
    await this.page.waitForLoadState('networkidle');
  }

  async searchByEmploymentStatus(status: string) {
    await this.page.selectOption('select[name="empsearch[employee_status]"]', { label: status });
    await this.page.click('button[type="submit"]');
    await this.page.waitForLoadState('networkidle');
  }

  async searchBySupervisor(supervisor: string) {
    await this.page.fill('input[name="empsearch[supervisor_name]"]', supervisor);
    await this.page.click('button[type="submit"]');
    await this.page.waitForLoadState('networkidle');
  }

  async searchByNameAndTitle(name: string, title: string) {
    await this.page.fill('input[placeholder="Type for hints..."]', name);
    await this.page.selectOption('select[name="empsearch[job_title]"]', { label: title });
    await this.page.click('button[type="submit"]');
    await this.page.waitForLoadState('networkidle');
  }

  async getResultNames(): Promise<string[]> {
    return await this.page.$$eval('table tbody tr td:nth-child(3)', tds => tds.map(td => td.textContent?.trim() || ''));
  }

  async getResultIds(): Promise<string[]> {
    return await this.page.$$eval('table tbody tr td:nth-child(2)', tds => tds.map(td => td.textContent?.trim() || ''));
  }

  async getResultJobTitles(): Promise<string[]> {
    return await this.page.$$eval('table tbody tr td:nth-child(4)', tds => tds.map(td => td.textContent?.trim() || ''));
  }

  async getResultStatuses(): Promise<string[]> {
    return await this.page.$$eval('table tbody tr td:nth-child(5)', tds => tds.map(td => td.textContent?.trim() || ''));
  }

  async getResultSupervisors(): Promise<string[]> {
    return await this.page.$$eval('table tbody tr td:nth-child(6)', tds => tds.map(td => td.textContent?.trim() || ''));
  }

  async getResultCount(): Promise<number> {
    return await this.page.$$eval('table tbody tr', rows => rows.length);
  }

  async isNoResultDisplayed(): Promise<boolean> {
    return await this.page.isVisible('text=No Records Found');
  }
}
