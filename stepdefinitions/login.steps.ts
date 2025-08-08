import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

Given('the user is on the login page', async function () {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('the user enters a valid username {string}', async function (username: string) {
  await loginPage.enterUsername(username);
});

When('the user enters a valid password {string}', async function (password: string) {
  await loginPage.enterPassword(password);
});

When('the user enters an invalid username {string}', async function (username: string) {
  await loginPage.enterUsername(username);
});

When('the user enters an invalid password {string}', async function (password: string) {
  await loginPage.enterPassword(password);
});

When('the user leaves the username field empty', async function () {
  await loginPage.enterUsername('');
});

When('the user leaves the password field empty', async function () {
  await loginPage.enterPassword('');
});

When('the user clicks the login button', async function () {
  await loginPage.clickLogin();
});

Then('the user should be redirected to the dashboard', async function () {
  await loginPage.assertDashboardVisible();
  await browser.close();
});

Then('an error message {string} should be displayed', async function (message: string) {
  await loginPage.assertErrorMessage(message);
  await browser.close();
});

Given('the user is logged in', async function () {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');
  await loginPage.assertDashboardVisible();
});

When('the user should be redirected to the login page', async function () {
  await loginPage.assertRedirectedToLogin();
});

Given('the user has reset their password to {string}', async function (newPassword: string) {
  this.newPassword = newPassword;
});

When('the user enters the new password {string}', async function (password: string) {
  await loginPage.enterPassword(password);
});

When('required field error should be displayed for {string}', async function (field: string) {
  await loginPage.assertRequiredFieldError(field);
});


Then('required field error should be displayed for both username and password', async function () {
  await loginPage.assertRequiredFieldError("username");
  await loginPage.assertRequiredFieldError("password");
});
