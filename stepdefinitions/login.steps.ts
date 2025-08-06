import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/login.page';
import { launchBrowser } from '../helpers/browser.helper';
import { CustomWorld } from '../world/world';


let loginPage: LoginPage;

Given('I open the login page', { timeout: 20000 }, async function (this: CustomWorld) {
  const page = await launchBrowser(this);
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('I login with username {string} and password {string}', async function (username: string, password: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(username, password);
  if (username === 'Admin' && password === 'admin123') {
    await loginPage.assertDashboardVisible();
  } else {
    await loginPage.assertErrorMessage('Invalid credentials');
  }
});

Then('I should see the dashboard page', async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.assertDashboardVisible();
});
