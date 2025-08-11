import { Given, When, Then } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { SearchPage } from '../pages/search.page';
import { CustomWorld } from '../world/world';
import { expect } from '@playwright/test';

//
// Background
//
Given(
  'the user is logged in with account {string} password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    this.page = await context.newPage();

    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
    await loginPage.clickLogin();
    await loginPage.assertDashboardVisible();

    // Khởi tạo SearchPage
    this.searchPage = new SearchPage(this.page);
  }
);

//
// Name search
//
When('I search for employee with name {string}', async function (this: CustomWorld, name: string) {
  if (!this.searchPage) throw new Error("SearchPage not initialized");
  await this.searchPage.gotoSearchPage();
  await this.searchPage.searchByName(name);
});

//
// ID search
//
When('I search for employee with ID {string}', async function (this: CustomWorld, empId: string) {
  if (!this.searchPage) throw new Error("SearchPage not initialized");
  await this.searchPage.gotoSearchPage();
  await this.searchPage.searchById(empId);
});

//
// Supervisor search
//
When('I search for employee with supervisor {string}', async function (this: CustomWorld, supervisor: string) {
  if (!this.searchPage) throw new Error("SearchPage not initialized");
  await this.searchPage.gotoSearchPage();
  await this.searchPage.searchBySupervisor(supervisor);
});

//
// Job title search
//
When('I search for employee with job title {string}', async function (this: CustomWorld, jobTitle: string) {
  if (!this.searchPage) throw new Error("SearchPage not initialized");
  await this.searchPage.gotoSearchPage();
  await this.searchPage.searchByJobTitle(jobTitle);
});

//
// Sub unit search
//
When('I search for employee in sub unit {string}', async function (this: CustomWorld, subUnit: string) {
  if (!this.searchPage) throw new Error("SearchPage not initialized");
  await this.searchPage.gotoSearchPage();
  await this.searchPage.searchBySubUnit(subUnit);
});

//
// Combined filters
//
When(
  'I search for employee with name {string} and job title {string} and sub unit {string}',
  async function (this: CustomWorld, name: string, jobTitle: string, subUnit: string) {
    if (!this.searchPage) throw new Error("SearchPage not initialized");
    await this.searchPage.gotoSearchPage();
    await this.searchPage.searchByMultipleFilters(name, jobTitle, subUnit);
  }
);

//
// No filters
//
When('I click the search button without entering any filters', async function (this: CustomWorld) {
  if (!this.searchPage) throw new Error("SearchPage not initialized");
  await this.searchPage.gotoSearchPage();
  await this.searchPage.clickSearch();
});

When('I click the search button without changing any filters', async function (this: CustomWorld) {
  if (!this.searchPage) throw new Error("SearchPage not initialized");
  await this.searchPage.gotoSearchPage();
  await this.searchPage.clickSearch();
});

//
// Assertions
//
Then('I should see employee {string} in the results', async function (this: CustomWorld, name: string) {
  if (!this.page || !this.searchPage) throw new Error("Page or SearchPage not initialized");

  // sleep 10s
    await this.page.waitForTimeout(10000);

  await this.page.waitForFunction(
    (expectedName) => {
      const cells = Array.from(document.querySelectorAll('.oxd-table-body .oxd-table-cell:nth-child(3)'));
      return cells.some((cell) => cell.textContent?.trim() === expectedName);
    },
    name,
    { timeout: 10000 }
  );

  const resultNames = await this.searchPage.getResultNames();
  expect(resultNames).toContain(name);
});

Then('I shouldnt see employee {string} in the results', async function (this: CustomWorld, name: string) {
    if (!this.page || !this.searchPage) throw new Error("Page or SearchPage not initialized");
    
    await this.page.waitForTimeout(10000);
    
    const resultNames = await this.searchPage.getResultNames();
    expect(resultNames).not.toContain(name);
    
    const hasName = resultNames.some((n) => n.includes(name));
    expect(hasName).toBe(false);
});

Then('I should see no results displayed', async function (this: CustomWorld) {
  if (!this.searchPage) throw new Error("SearchPage not initialized");
  const resultsCount = await this.searchPage.getResultCount();
  expect(resultsCount).toBe(0);
});

Then('all results should have supervisor {string}', async function (this: CustomWorld, supervisor: string) {
  if (!this.searchPage) throw new Error("SearchPage not initialized");
  const supervisors = await this.searchPage.getResultSupervisors();
  expect(supervisors.every((s) => s === supervisor)).toBe(true);
});

Then('all results should have job title {string}', async function (this: CustomWorld, jobTitle: string) {
  if (!this.searchPage) throw new Error("SearchPage not initialized");
  const jobTitles = await this.searchPage.getResultJobTitles();
  expect(jobTitles.every((jt) => jt === jobTitle)).toBe(true);
});

Then('all results should belong to sub unit {string}', async function (this: CustomWorld, subUnit: string) {
  if (!this.searchPage) throw new Error("SearchPage not initialized");
  const subUnits = await this.searchPage.getResultSubUnits();
  expect(subUnits.every((su) => su === subUnit)).toBe(true);
});

Then(
  'all results should match name {string} and job title {string} and sub unit {string}',
  async function (this: CustomWorld, name: string, jobTitle: string, subUnit: string) {
    if (!this.searchPage) throw new Error("SearchPage not initialized");
    const names = await this.searchPage.getResultNames();
    const jobTitles = await this.searchPage.getResultJobTitles();
    const subUnits = await this.searchPage.getResultSubUnits();

    expect(names.some((n) => n.includes(name))).toBe(true);
    expect(jobTitles.every((jt) => jt === jobTitle)).toBe(true);
    expect(subUnits.every((su) => su === subUnit)).toBe(true);
  }
);

Then('the system should display all employees', async function (this: CustomWorld) {
  if (!this.searchPage) throw new Error("SearchPage not initialized");
  const count = await this.searchPage.getResultCount();
  expect(count).toBeGreaterThan(0);
});

Then('I should see {string} alert', async function (this: CustomWorld, alertText: string) {
  if (!this.page) throw new Error("Page not initialized");
  const alert = this.page.locator('//span[text()="' + alertText + '"]');
  await expect(alert).toBeVisible({ timeout: 5000 });
});
