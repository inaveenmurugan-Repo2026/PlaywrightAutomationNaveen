// purpose of this file is consolidate all the page objects into a single file.
const { LoginPage } = require('./LoginPage');
const { DashBoardPage } = require('./DashBoardPage');
const { checkoutPageRefined } = require('./CheckoutPageRefined');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page);
        this.refinedCheckoutPage = new checkoutPageRefined(this.page);
    }



    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashBoardPage;
    }

    getRefinedCheckoutPage() {
        return this.refinedCheckoutPage;
    }

}

module.exports = { POManager };