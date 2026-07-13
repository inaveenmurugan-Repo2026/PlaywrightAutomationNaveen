const { expect, test } = require('@playwright/test');
const { ApiUtils } = require('../../utils/ApiUtils');

let webContext;

test('@APIsmoke TestCase_01_Login_Functionality', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const pageURL = ("https://rahulshettyacademy.com/client/#/auth/login");
    const UserName = page.locator("#userEmail");        //("abc2611@gmail.com");
    const Password = page.locator("#userPassword");               //("Test@123");
    const SignIn = page.locator("#login");
    const products = page.locator(".card-body");



    await page.goto(pageURL);
    await UserName.fill("abc2611@gmail.com");
    await Password.fill("Test@123");
    await SignIn.click();
    await page.waitForLoadState("networkidle");
    await context.storageState({ path: 'state.json' });

    webContext = await browser.newContext({ storageState: 'state.json' });
});

test('TestCase_02_End2End', async () => {

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = await page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles)

    const productName = "ZARA COAT 3"
    const count = await products.count();
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add to Cart").click(); //finding locator based on Text
            break;
        }    //https://rahulshettyacademy.com/client
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();        //finding text based locator given by playWright -sudo classes
    // for isVisible playwright will not be automatically supporting wait so we are calling (the specific locator div and waitfor function)
    expect(bool).toBeTruthy();

    await page.locator("text = Checkout").click();
    await page.locator("[placeholder*='Select Country']").pressSequentially("Ind", { delay: 150 });
    const dropdown = await page.locator("[class*='ta-results']");

    await dropdown.waitFor();
    const options = dropdown.locator("[type='button']");
    const optionscount = await options.count();

    for (let i = 0; i < optionscount; i++) {
        const text = await options.nth(i).textContent();
        if (text === " India") {
            // text.trim() --> to avoid text error if want. or else can give space
            await options.nth(i).click();
            break;
        }
    }


});


