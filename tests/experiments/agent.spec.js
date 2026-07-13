//Use page.route to intercept the fetch and fulfill it with a 500 JSON response so the UI sees a server error. Example Playwright test (JS):
// const { test, expect, request } = require('@playwright/test');

const { test, expect, request } = require('@playwright/test');

const { ApiUtils } = require('../../utils/ApiUtils');

const loginPayLoad = { userEmail: "abc2611@gmail.com", userPassword: "Test@123" };
const createOrderRequestPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const forgedPayload ={ error: "Internal Server Error" };
let response;
let apicontext;
test.beforeAll(async () => { //ex: test1,test2,test3 ---->(.beforeAllannotation) before everything this block of code will be executed.

    apicontext = await request.newContext();
    const apiUtils = new ApiUtils(apicontext, loginPayLoad);
    response = await apiUtils.createOrder(createOrderRequestPayload);
});


test('shows error UI when /api/v1/userdata returns 500', async ({ page }) => {
  await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', route =>
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify(forgedPayload),
    })
  );

  await page.goto('https://rahulshettyacademy.com/client'); // adjust to your app
  // perform the action that triggers the fetch if needed, e.g.:
  // await page.click('button:has-text("Load user")');
await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
   await page.locator("button[routerlink*='myorders']").click(); // adjust selector
});