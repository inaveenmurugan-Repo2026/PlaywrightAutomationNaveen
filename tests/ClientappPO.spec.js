const { test, expect } = require('@playwright/test');
// const { LoginPage } = require('../tests/pageobjects/loginPage'); // this is the path of the loginPage.js file. we are importing this file because we want to use the LoginPage class in this file. so that we can create an object of this class and use the constructor of this class.
// const { DashBoardPage } = require('../tests/pageobjects/DashBoardPage');
// const { checkOutPage } = require('../tests/pageobjects/CheckOutPage');
// const { checkoutPageRefined } = require('../tests/pageobjects/CheckoutPageRefined');

// now the above created Page objects are clubbed into single file,so that we can call them once via creating object.
const { POManager } = require('../pageobjects/POManager');
const dataset = JSON.parse(JSON.stringify(require('../testdata/testdata.json')));
//since it already converts as jscript obj we dont need to parse.
//Json to String -> Js object(parse)

test.skip('Client App Page Object Model', async ({ page }) => {

    const username = "abc2611@gmail.com";
    const password = "Test@123";
    const productName = "iphone 13 pro";

    const loginPage = new LoginPage(page); // this object is created to use the constructor of the LoginPage class. when we are creating this object then the constructor will be called automatically and the loginBtn will be initialized with the locator. so that we can use this loginBtn in other class.
    await loginPage.goTo(); // this is the method of the LoginPage class. we are calling this method to go to the login page. when we are calling this method then the Goto() method will be called and the page will be navigated to the login page.
    await loginPage.validLogin(username, password);

    const dashBoardPage = new DashBoardPage(page); // this object is created to use the constructor of the DashBoardPage class. when we are creating this object then the constructor will be called automatically and the products will be initialized with the locator. so that we can use this products in other class.
    await dashBoardPage.searchProductsAddtoCart(productName); // this is the method of the DashBoardPage class. we are calling this method to search the product. when we are calling this method then the searchProductsAddtoCart() method will be called and the product will be searched.
    await dashBoardPage.navigateToCartPage(); // this is the method of the DashBoardPage class. we are calling this method to navigate to the cart page. when we are calling this method then the navigateToCartPage() method will be called and the page will be navigated to the cart page.

    // const checkout = new checkOutPage(page);
    // const productName2 = "iphone 13 pro";
    // await checkout.checkOutOrderPlacement(productName2);

    const refinedCheckoutPage = new checkoutPageRefined(page);
    const month = "11";
    const year = "29";
    const prodName = "iphone 13 pro";
    const cvv = "234313";
    const cardName = "Naveen";
    const couponId = "rahulshettyacademy";
    const mailID = "abc2611@gmail.com";
    const countryName = " Indonesia"
    const orderMessage = " Thankyou for the order. ";

    await refinedCheckoutPage.checkout(prodName);
    await refinedCheckoutPage.selectCheckoutCountry(countryName);
    await refinedCheckoutPage.enterPaymentDetails(cvv, cardName, month, year);
    await refinedCheckoutPage.applyCoupon(couponId);
    await refinedCheckoutPage.assertOrderMailID(mailID);

    await refinedCheckoutPage.orderPlacement(orderMessage);
    const orderID = await refinedCheckoutPage.getOrderID();
    console.log(orderID);

});

test.skip('client App POM Invalid Login', async ({ page }) => {
    const errorMessage = page.locator(".toast-message");
    const username = "invalidUser@gmail.com";
    const password = "1223231";

    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.invalidLogin(username, password);
    await expect(errorMessage).toContainText("Incorrect email or password.");
    page.pause();

});

test.skip('Executing Using POManager', async ({ page }) => {


    const testdata = {
        username: "abc2611@gmail.com",  //store -> key value pairs as json
        password: "Test@123",
        productName: "iphone 13 pro",
        month: "11",
        year: "29",
        cvv: "234313",
        cardName: "Naveen",
        couponId: "rahulshettyacademy",
        mailID: "abc2611@gmail.com",
        countryName: "Indonesia",
        orderMessage: "Thankyou for the order."
    }

    const POmanager = new POManager(page);
    const loginpage = POmanager.getLoginPage();
    const dashboardPage = POmanager.getDashboardPage();
    const checkoutPage = POmanager.getRefinedCheckoutPage();


    await loginpage.goTo();
    await loginpage.validLogin(testdata.username, testdata.password);



    await dashboardPage.searchProductsAddtoCart(testdata.productName);
    await dashboardPage.navigateToCartPage();


    await checkoutPage.checkout(testdata.productName);
    await checkoutPage.selectCheckoutCountry(testdata.countryName);
    await checkoutPage.enterPaymentDetails(testdata.cvv, testdata.cardName, testdata.month, testdata.year);
    await checkoutPage.applyCoupon(testdata.couponId);
    await checkoutPage.assertOrderMailID(testdata.mailID);
    await checkoutPage.orderPlacement(testdata.orderMessage);

    //Verification
    const orderID = await checkoutPage.getOrderID();
    console.log("Verified OrderID:", orderID);



});


test.skip('JsonFileTestDataCheckout', async ({ page }) => {
    const POmanager = new POManager(page);
    const loginpage = POmanager.getLoginPage();
    const dashboardPage = POmanager.getDashboardPage();
    const checkoutPage = POmanager.getRefinedCheckoutPage();


    await loginpage.goTo();
    await expect(loginpage.loginBtn).toBeVisible();
    await loginpage.validLogin(dataset.username, dataset.password);




    await dashboardPage.searchProductsAddtoCart(dataset.productName);
    await dashboardPage.navigateToCartPage();
    await dashboardPage.verifyTitle(dataset.dashboardTitle);

    //await expect(dashboardPage.productsText).toBeVisible();


    await checkoutPage.checkout(dataset.productName);
    await checkoutPage.selectCheckoutCountry(dataset.countryName);
    await expect(checkoutPage.selectCountry).toHaveValue(dataset.countryName);




    await checkoutPage.enterPaymentDetails(dataset.cvv, dataset.cardName, dataset.month, dataset.year);
    await checkoutPage.applyCoupon(dataset.couponId);
    await checkoutPage.assertOrderMailID(dataset.mailID);
    await checkoutPage.orderPlacement(dataset.orderMessage);

    //Verification
    const orderID = await checkoutPage.getOrderID();
    console.log("Verified OrderID:", orderID);


});

