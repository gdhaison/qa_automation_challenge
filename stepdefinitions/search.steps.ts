import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SearchPage } from '../pages/search.page';
import { LoginPage } from '../pages/login.page';
import { CustomWorld } from '../world/world';

let loginPage: LoginPage;
let searchPage: SearchPage;

When('I navigate to the employee search page', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  // Switch context from LoginPage to SearchPage after dashboard
  searchPage = new SearchPage(this.page);
  await searchPage.gotoSearchPage();
});

When('I search for employee with name {string}', async function (this: CustomWorld, name: string) {
  await searchPage.searchByName(name);
});

When('I search for employee with ID {string}', async function (this: CustomWorld, id: string) {
  await searchPage.searchById(id);
});

When('I search without entering any criteria', async function (this: CustomWorld) {
  await searchPage.searchWithoutCriteria();
});

When('I search for employees with job title {string}', async function (this: CustomWorld, title: string) {
  await searchPage.searchByJobTitle(title);
});

When('I search for employees with status {string}', async function (this: CustomWorld, status: string) {
  await searchPage.searchByEmploymentStatus(status);
});

When('I search for employees with supervisor name {string}', async function (this: CustomWorld, supervisor: string) {
  await searchPage.searchBySupervisor(supervisor);
});

When('I search for employee with name {string} and job title {string}', async function (this: CustomWorld, name: string, title: string) {
  await searchPage.searchByNameAndTitle(name, title);
});

Then('I should see employee {string} in the results', async function (this: CustomWorld, name: string) {
  const resultNames = await searchPage.getResultNames();
  expect(resultNames).toContain(name);
});

Then('I should see employee with ID {string} in the results', async function (this: CustomWorld, id: string) {
  const resultIds = await searchPage.getResultIds();
  expect(resultIds).toContain(id);
});

Then('I should see at least one employee with name containing {string}', async function (this: CustomWorld, namePart: string) {
  const resultNames = await searchPage.getResultNames();
  expect(resultNames.some(name => name.includes(namePart))).toBeTruthy();
});

Then('I should see no search results', async function (this: CustomWorld) {
  expect(await searchPage.isNoResultDisplayed()).toBeTruthy();
});

Then('I should see all employees listed', async function (this: CustomWorld) {
  expect(await searchPage.getResultCount()).toBeGreaterThan(0);
});

Then('I should see only employees with job title {string}', async function (this: CustomWorld, title: string) {
  const titles = await searchPage.getResultJobTitles();
  expect(titles.every(t => t === title)).toBeTruthy();
});

Then('I should see only employees with status {string}', async function (this: CustomWorld, status: string) {
  const statuses = await searchPage.getResultStatuses();
  expect(statuses.every(s => s === status)).toBeTruthy();
});

Then('I should see only employees whose supervisor is {string}', async function (this: CustomWorld, supervisor: string) {
  const supervisors = await searchPage.getResultSupervisors();
  expect(supervisors.every(s => s === supervisor)).toBeTruthy();
});

Then('I should see only matching employees', async function (this: CustomWorld) {
  expect(await searchPage.getResultCount()).toBeGreaterThan(0);
});
