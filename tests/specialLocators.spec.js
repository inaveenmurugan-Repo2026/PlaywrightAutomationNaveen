import { test, expect } from '@playwright/test';

test('playwirght special locators_TestCase01', async ({ page }) => {

    const webUrl = ("https://rahulshettyacademy.com/angularpractice/");

    await page.goto(webUrl);

    //getByLabel means u can access the actionpoint using label text given in the label section of DOM.

    await page.getByLabel("Check me out if you Love IceCreams!").click(); // can also use .check() if it is checkbox or radiobutton
    await page.getByLabel("Employed").check();

    // use get Bylabel for clicking radio btn, checkbox  or dropdown selections.

    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Nav12321"); //getByplaceholder--if u find any 

    // placeholder in the dom u can use by placeholder option and with its value. it will access the specific part and 
    // can also be used to fill any of inputvalue.
    //note : label will not work if u didnt get highlighted when u clicking the label.
    //getByRole is an advanced  one-- we can access the dom sepecific part using the name.

    await page.getByRole("button", { name: 'Submit' }).click(); //[pass the button value in the name-it will search all button and find the sumbit btn and click]
    const visible = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    console.log(visible);
    await expect(visible).toBeTruthy();
    await page.getByRole("link", { name: 'Shop' }).click();
    await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button").click();
    await page.locator("app-card").filter({ hasText: "iphone X" }).getByRole("button").click();

    await page.locator("app-card").filter({hasText : "Blackberry"}).getByText("Add ").click();
    //filter({ hasText: 'Nokia Edge' }).getByRole("button").click();
    //"we need to use all default functions to chain and execute the function"
    await page.pause();

});

