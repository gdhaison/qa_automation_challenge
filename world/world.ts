// world.ts
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, Page } from '@playwright/test';
import { SearchPage } from '../pages/search.page';

export class CustomWorld extends World {
  browser?: Browser;
  page!: Page
  searchPage?: SearchPage;
  browserType: string = 'chromium'; // default value
  headless: boolean = true; // default value

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
