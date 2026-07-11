const { test, expect } = require('@playwright/test'); // expect is an assertion
const { constants } = require('node:buffer');
const { title } = require('node:process');
const { isContext } = require('node:vm');

test('TestCase_01_Login_Functionality', async ({ page }) => {

    const pageURL = ("https://rahulshettyacademy.com/client/#/auth/login");
    const UserName = page.locator("#userEmail");        //("abc2611@gmail.com");
    const Password = page.locator("#userPassword");               //("Test@123");
    const SignIn = page.locator("#login");
    const products = page.locator(".card-body");

    await page.goto(pageURL);
    await UserName.fill("abc2611@gmail.com");
    await Password.fill("Test@123");
    await page.pause();
    await SignIn.click();

    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles)
    const count = await products.count();

    for (let i = 0; i < count; i++) {

        const title = await products.nth(i).innerText();
        console.log(i, title);
    }
});

test('@WebsmokeTest TestCase_02_End2End', async ({ page }) => {

    const pageURL = ("https://rahulshettyacademy.com/client/#/auth/login");
    const UserName = page.locator("#userEmail");   // ("abc2611@gmail.com");


    const Password = page.locator("#userPassword");//  ("Test@123");

    const SignIn = page.locator("#login");

    const products = page.locator(".card-body");

    await page.goto(pageURL);
    await UserName.fill("abc2611@gmail.com");
    await Password.fill("Test@123");
    //  await page.setViewportSize({ width: 1707, height: 1000 });

    // await page.pause();

    await SignIn.click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
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
    // await page.pause();

    const assertEmail = page.locator(".user__name.mt-5 [type='text']");
    //  const BillingEmail = await page.locator(".user__name.mt-5 [type='text']").textContent();

    await expect(assertEmail.first()).toHaveText("abc2611@gmail.com");

    console.log(await assertEmail.first().textContent());


    const CvvCode = page.locator("[class*='input txt']");

    await CvvCode.nth(1).fill("8667576");


    const dropdownExp = page.locator("[class='input ddl']");

    await dropdownExp.first().selectOption("10");

    await dropdownExp.last().selectOption("22");

    const CardName = page.locator("[class*='input txt']");
    await CardName.nth(2).fill("Naveen");



    const coupon = page.locator("input[name=coupon]");
    await coupon.fill("rahulshettyacademy");

    const Applycoupon = page.locator("button[class='btn btn-primary mt-1']");
    await Applycoupon.click();

    await page.locator("text=Place Order").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    await page.pause();

    const OrderID = await page.locator("//label[@class='ng-star-inserted']").textContent(); // .em-spacer-1 .ng-star-inserted
    console.log(OrderID);


    await page.getByText(" ORDERS").nth(1).click();


    await page.locator("tbody tr").first().waitFor();

    const cleanOrderID = OrderID.replace(/\|/g, "").trim();

    //Remove all | Remove spaces/newlines.  g (globally)means all pipes in the line

    console.log(cleanOrderID);



    const OrderRows = await page.locator("tbody tr");

    const ordercount = await OrderRows.count();
    console.log("Total Orders : " + ordercount);

    await page.pause();

    for (let i = 0; i < ordercount; i++) {
        const orderRow = await OrderRows.nth(i);

        const rowOrderID = await orderRow.locator("th").textContent();

        console.log("UI order ID: ", rowOrderID);

        if (rowOrderID.trim() === cleanOrderID.trim()) {

            await orderRow.locator("button:has-text('View')").click();

            console.log("Match found : ", rowOrderID);
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(cleanOrderID.includes(orderIdDetails)).toBeTruthy();

    const finalOrderID = await page.locator("//div[@class='col-text -main']").textContent();

    if (finalOrderID === cleanOrderID) {  //alternate=== if(finalOrderID.incldues(cleanOrderID){})

        console.log("----Success----");
    }

    //const assertOrderMail = await page.locator("[class='text']").first().textContent();

    const assertOrderMail = await page.locator(".text").first().textContent();

    expect(assertOrderMail.includes("abc2611@gmail.com")).toBeTruthy();

    console.log("Billing Mail and User Mail Matched: ",assertOrderMail);



    //    await expect(page.locator(".text").first())
    //     .toContainText("abc2611@gmail.com");

    await page.pause();


    console.log("PCM checking...Jenkins...");
    console.log("PCM checking...every minute...Jenkins...");
});

