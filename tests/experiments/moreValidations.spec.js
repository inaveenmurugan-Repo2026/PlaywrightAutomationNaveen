const { test, expect } = require('@playwright/test');


test('newValidations_Testcase_01', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();


    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    // await expect(page.locator("#hide-textbox")).toBeHidden();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.locator("#show-textbox").click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();



    await page.locator("#confirmbtn").click();
    await page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.on('dialog', dialog => dialog.dismiss());
    // await page.pause();


    await page.locator("#mousehover").hover();
    //I frames---------------------------------------------------------------------------
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const subscribers = await framePage.locator(".text h2").textContent();
    const total = subscribers.split(" ")[1];
    const otherwords = subscribers.split(" ")[2];
    console.log("Total Number of Subscribers is : ", total);
    console.log("Second Array Element : ", otherwords);

});