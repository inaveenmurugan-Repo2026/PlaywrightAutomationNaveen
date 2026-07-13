const { test, expect } = require("@playwright/test");

test('test01_Record and play', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/angularpractice/shop");
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
  await page.getByText('Checkout ( 1 ) (current)').click();
  await expect(page.locator('#exampleInputEmail1')).toHaveValue('1');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('india');
  await page.getByText('I agree with the term &').click();
  await page.locator('app-checkout').click();
  await page.locator('div').filter({ hasText: 'I agree with the term &' }).nth(2).click();
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.getByRole('textbox', { name: 'Please choose your delivery' })).toHaveValue('India');
  await expect(page.locator('app-checkout')).toContainText('× Success! Thank you! Your order will be delivered in next few weeks :-).');
  await expect(page.getByRole('button', { name: 'Purchase' })).toBeVisible();
});


