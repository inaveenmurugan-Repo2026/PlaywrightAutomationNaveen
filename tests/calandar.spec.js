const { test, expect } = require("@playwright/test");

test('Cal_practice_Test_01', async ({ page }) => {

    const year = "2028";
    const month = "09";
    const date = '16';


    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();


    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();

    // await page.locator(".react-calendar__year-view__months__month").nth(Number(month) - 1).click();

    await page.locator("//abbr[text()='" + date + "']").click();




    await page.pause();





});