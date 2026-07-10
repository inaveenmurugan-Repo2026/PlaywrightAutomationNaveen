const { test, expect } = require('@playwright/test');


test('@WebsmokeTest Screenshot and visual validations', async ({ page }) => {



    page.route('*/**.css', route => route.abort()); // it will block all the css files to load in the browser. it will make the page to load faster. (we can use this for performance testing also)
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();


    await expect(page.locator("#displayed-text")).toBeVisible();


    await page.locator("#displayed-text").screenshot({ path: 'element.jpeg' }); // it will take the screenshot of the element and save it in the root folder with the name element.png
    await page.locator("#hide-textbox").click();
    //await page.screenshot({ path: 'screenshot.png' }); // it will take the screenshot of the entire page and save it in the root folder with the name screenshot.png
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.locator("#show-textbox").click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();

});



test('Visual validation', async ({ page }) => {

    await page.goto("https://www.flightaware.com/");
    expect(await page.screenshot()).toMatchSnapshot('landingPage.png');  // it will take the screenshot of the entire page and compare it with the existing screenshot.png in the root folder. if there is any difference it will fail the test case.
});