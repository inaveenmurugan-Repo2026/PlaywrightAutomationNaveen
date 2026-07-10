
const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/testbase');
const { POManager } = require('../pageobjects/POManager');
const dataset = JSON.parse(JSON.stringify(require('../testdata/testdata.json')));

//to run parallel in same test...From same file by extending test option behaviour...
// test.describe.configure({ mode: 'parallel' }); //Execution is independent. each runs seperately
test.describe.configure({ mode: 'serial' }); // (from top to bottom)it interconects the next next testcases (if previous test was interconnected to next case use this) 
// (for ex: Login->createOrder->DeleteOrder)if one fails it will never move to next case it skips .
for (const data of dataset) {

    test(`Client App E2e- ${data.productName}`, async ({ page }) => {
        const POmanager = new POManager(page);
        const loginpage = POmanager.getLoginPage();
        const dashboardPage = POmanager.getDashboardPage();
        const checkoutPage = POmanager.getRefinedCheckoutPage();


        await loginpage.goTo();
        await expect(loginpage.loginBtn).toBeVisible();
        await loginpage.validLogin(data.username, data.password);

        await dashboardPage.searchProductsAddtoCart(data.productName);
        await dashboardPage.navigateToCartPage();
        await dashboardPage.verifyTitle(data.dashboardTitle);

        //await expect(dashboardPage.productsText).toBeVisible();
        await checkoutPage.checkout(data.productName);
        await checkoutPage.selectCheckoutCountry(data.countryName);
        await expect(checkoutPage.selectCountry).toHaveValue(data.countryName);

        await checkoutPage.enterPaymentDetails(data.cvv, data.cardName, data.month, data.year);
        await checkoutPage.applyCoupon(data.couponId);
        await checkoutPage.assertOrderMailID(data.mailID);
        await checkoutPage.orderPlacement(data.orderMessage);
        //Verification
        const orderID = await checkoutPage.getOrderID();
        console.log("Verified OrderID:", orderID);

    });

}

// this is alternate to Json file reading- we execute it from reading Jscript object
customtest(`Client App using Fixture`, async ({ page, testDataForLogin }) => {
    const POmanager = new POManager(page);
    const loginpage = POmanager.getLoginPage();
    const dashboardPage = POmanager.getDashboardPage();

    await loginpage.goTo();
    await expect(loginpage.loginBtn).toBeVisible();
    await loginpage.validLogin(testDataForLogin.username, testDataForLogin.password);




    await dashboardPage.searchProductsAddtoCart(testDataForLogin.productName);
    await dashboardPage.navigateToCartPage();
    await dashboardPage.verifyTitle(testDataForLogin.dashboardTitle);
});