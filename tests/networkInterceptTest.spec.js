const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('../utils/ApiUtils');

const loginPayLoad = { userEmail: "abc2611@gmail.com", userPassword: "Test@123" };
const createOrderRequestPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let response;
let apicontext;//global varibale
const fakeNetworkPayload = { data: [], message: "No Orders" }; // jscript object


//LoginApi..
test.beforeAll(async () => { //ex: test1,test2,test3 ---->(.beforeAllannotation) before everything this block of code will be executed.

    apicontext = await request.newContext();
    const apiUtils = new ApiUtils(apicontext, loginPayLoad);
    response = await apiUtils.createOrder(createOrderRequestPayload);
});


//Order Creation...
test('API_create Order', async ({ page }) => {

    // const apiutils = new ApiUtils(apicontext, loginPayLoad);

    const pageURL = ("https://rahulshettyacademy.com/client");

    await page.addInitScript(value => { //function
        window.localStorage.setItem('token', value);
    }, response.token);


    await page.goto(pageURL);
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", //6a0b1b1a965c23b43b24308c ---> * --any userid login

        async route => //fat operator to use async function
        {
            const response = await page.request.fetch(route.request()); //swtiching broswer mode to API testing helper mode
            let body = JSON.stringify(fakeNetworkPayload); // we need to convert this jscript obj to json payload.
            await route.fulfill(
                {
                    response, //it will intercept the api response -> and fulfill replace the body we sent as data
                    body, // our data.
                }
            )
            // intercepting the response-> APi response=>{Playwright fake response}-> browser
        }
    )



    //routing has to happen before we click on the orders...
    await page.locator("button[routerlink*='myorders']").click();

    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"); //* means any id u can intercept

    const noOrders = await page.locator(".mt-4").textContent();
    console.log(noOrders);

    await page.pause();
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



//APIRequestContext to generate tokens through
// login APIs and inject them into localStorage or
//  request headers to bypass UI login and speed up test execution.

// test.beforeEach(() => {
//     ;// //ex: test1,test2,test3 ----> before each test this block of code will be executed.

// })
