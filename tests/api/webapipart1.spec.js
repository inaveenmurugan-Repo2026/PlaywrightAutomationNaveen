const { test, expect, request } = require('@playwright/test');

const { ApiUtils } = require('../utils/ApiUtils');

const loginPayLoad = { userEmail: "abc2611@gmail.com", userPassword: "Test@123" };
const createOrderRequestPayload = { orders: [{ country: "Cuba", productOrderedId: "6a4f680a85b8849b49d91266" }] };
let response;
let apicontext;//global varibale

//LoginApi..
test.beforeAll(async () => { //ex: test1,test2,test3 ---->(.beforeAllannotation) before everything this block of code will be executed.

    apicontext = await request.newContext();
    const apiUtils = new ApiUtils(apicontext, loginPayLoad);
    response = await apiUtils.createOrder(createOrderRequestPayload);
});


//Order Creation...
test('@APIsmoke API_create Order', async ({ page }) => {

    // const apiutils = new ApiUtils(apicontext, loginPayLoad);

    const pageURL = ("https://rahulshettyacademy.com/client");

    await page.addInitScript(value => { //function
        window.localStorage.setItem('token', value);
    }, response.token);


    await page.goto(pageURL);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderID.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    //await page.pause();
    expect(response.orderID.includes(orderIdDetails)).toBeTruthy();
});

module.exports = { ApiUtils };

//APIRequestContext to generate tokens through
// login APIs and inject them into localStorage or
//  request headers to bypass UI login and speed up test execution.

// test.beforeEach(() => {
//     ;// //ex: test1,test2,test3 ----> before each test this block of code will be executed.

// })
