const { test, expect } = require('@playwright/test');

test('TestCase_01_Login_Functionality_otherway', async ({ page }) => {

    const pageURL = ("https://rahulshettyacademy.com/client/#/auth/login");
    const UserName = page.getByPlaceholder("email@example.com");        //("abc2611@gmail.com");
    const Password = page.getByPlaceholder("enter your passsword");               //("Test@123");
    const SignIn = page.getByRole('button', { name: "Login" });
    const products = page.locator(".card-body");

    await page.goto(pageURL);
    await UserName.fill("abc2611@gmail.com");
    await Password.fill("Test@123");
    // await page.pause();

    await SignIn.click();

    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body").filter({ hasText: "ADIDAS ORIGINAL" })
        .getByRole("button", { name: "Add To Cart" }).click();
    await page.getByRole("listitem").getByRole("button", { name: "cart" }).click();
    await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();

    //await page.pause();

    await page.locator("div li").first().waitFor();

    await page.getByRole("button", { name: "Checkout" }).click();

    //await page.getByPlaceholder("Select Country").getByRole("button", { name: "INDIA" }).nth(1).click();

    await page.getByPlaceholder("Select Country").pressSequentially("Ind");
    const options = page.locator(".ta-results button");
    await options.nth(1).click();
    await page.keyboard.press('Enter');




    await page.getByText("Place Order ").click();
    
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();


    //await page.getByPlaceholder("Select Country").pressSequentially("IND");
    await page.pause();

    // await page.locator(".ta-results").waitFor();

    //await page.getByRole("button", { name: "India", exact: true }).click();

    // await page.locator("//input[@class='input txt']").first().fill("28327");
    // await page.locator("//input[@class='input txt']").last().fill("Naveen");

    // await page.getByText("Place Order ").click();

    //  await page.locator(".btnn action__submit ng-star-inserted").click();

    // await page.waitForLoadState('networkidle');


    // await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    // await expect(page.getByText("Thankyou for the order.")).toBeVisible();



});