import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const csvFilePath = path.resolve(__dirname, 'search_data_positive.csv'); // đổi tên file nếu cần
const csvData = fs.readFileSync(csvFilePath, 'utf-8');

interface CsvRecord {
  username: string;
  password: string;
  keyword: string;
  expected_status: string;
  first_name: string;
  last_name: string;
  job_title: string;
  subunit: string;
  empStatus: string;
}

const records = parse(csvData, {
  columns: true,
  skip_empty_lines: true,
}) as CsvRecord[];

for (const record of records) {
  test(`Search API test for user=${record.username} keyword=${record.keyword}`, async ({ page }) => {
    // Login
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.fill('input[name="username"]', record.username);
    await page.fill('input[name="password"]', record.password);
    await page.click('button[type="submit"]');
    await expect(page.locator('h6:has-text("Dashboard")')).toBeVisible();

    // Lấy cookie cho request
    const cookies = await page.context().cookies();
    const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

    const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees';
    const queryParams = new URLSearchParams({
    limit: '50',
    offset: '0',
    nameOrId: record.keyword,   // chèn keyword từ CSV vào đây
    model: 'detailed',
    includeEmployees: 'onlyCurrent',
    sortField: 'employee.firstName',
    sortOrder: 'ASC',
    });

    const url = `${baseUrl}?${queryParams.toString()}`;

    const apiResponse = await page.request.get(url, {
    headers: {
        'Accept': 'application/json',
        'Cookie': cookieHeader,
    },
    });

    expect(apiResponse.status()).toBe(Number(record.expected_status));

    const body = await apiResponse.json();

    console.log('Response body:', body);


    const emp = body.data[0];

    expect(emp.firstName).toBe(record.first_name);
    expect(emp.lastName).toBe(record.last_name);
    expect(emp.jobTitle.title).toBe(record.job_title);
    expect(emp.subunit.name).toBe(record.subunit);
    expect(emp.empStatus.name).toBe(record.empStatus);
  });
}
