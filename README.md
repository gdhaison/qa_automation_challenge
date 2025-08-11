# QA Automation Challenge

This project is a QA automation framework built using **Cucumber-js** for BDD (Behavior Driven Development) and **Playwright** for browser automation. It uses **TypeScript** as the primary programming language.

## Features

- BDD style test scenarios with Cucumber-js.
- Cross-browser testing with Playwright: Chromium, Firefox, and WebKit.
- Supports running tests in both headed and headless modes.
- Generates test reports in HTML and JSON formats.
- Ability to run tests in parallel across multiple browsers.
- Includes CSV parsing capabilities (using `csv-parse` library).

## Project Structure

- `features/`: Contains Gherkin feature files defining test scenarios.
- `steps/` or `step-definitions/`: Implementation of step definitions (glue code).
- `pages/`: Page Object Model classes for encapsulating page interactions.
- `reports/`: Generated test reports (HTML and JSON).
- `package.json`: Project configuration and npm scripts.
- `tsconfig.json`: TypeScript configuration.

## CICD
In this project, I will trigger run automation by Github Action
It's going to run when a PR is created or a new commit is pushed to this PR

You can see the configuration in /.github/workflows/prtest.yml
The result will be displayed in the comment section of every PR, you can check it here: https://github.com/gdhaison/qa_automation_challenge/pull/3

It will be displayed like this format, and you can download the report directly:
```
✅ Passed: 20
❌ Failed: 3
📄 Full report available in Artifacts
```

## Prerequisites

- Node.js (recommended version >= 18)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:gdhaison/qa_automation_challenge.git
   cd qa_automation_challenge

2. Install dependencies:
    npm install

3. Install Playwright browsers:
    npx playwright install

## Running Tests

1. Run all test with the browser you want:
   npm run test:bdd:chrome:headless
   npm run test:bdd:firefox:headless
   npm run test:bdd:webkit:headless

2. Run tests in parallel on all supported browsers:
    npm run test:bdd:all

## Test Reports

After running tests, reports are generated inside the reports/ directory:
HTML reports: View in a browser to see detailed test results.
JSON reports: Useful for CI integrations or further processing.

## Environment Variables
BROWSER: Set the browser to run tests on (chromium, firefox, or webkit).
HEADLESS: Set to true to run tests without opening browser UI.
These can be set via the npm scripts or manually using cross-env.


## API testing
The destination website doesn't have public api for login function so I created a demo api
search testcase using Data-driven pattern

You can run it by running: npx playwright test tests/ --reporter=html
