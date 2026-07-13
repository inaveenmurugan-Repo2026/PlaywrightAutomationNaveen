const { test, expect } = require('@playwright/test');

test("intercepting network request and mocking request", async ({ page }) => {
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
    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a32703617ee3e78bae6ef94" }) //order id doesnt belong to the user
    ) //networkcontinue---> for hacking....mocking the request url with the order id which is not belong to the user.      
  
    await page.locator("button:has-text('View')").first().click();

    const extext =page.locator("p");
    await expect(extext.last()).toHaveText("You are not authorize to view this order");
   

    });