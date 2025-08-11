import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, Page } from 'playwright';

export class CustomWorld extends World {
  browser?: Browser;
  page?: Page;
  browserType?: string;
  headless?: boolean;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
