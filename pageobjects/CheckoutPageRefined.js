
const { expect } = require('@playwright/test');


class checkoutPageRefined {

    constructor(page) {
        this.page = page;
        this.checkoutBtn = page.locator("text = Checkout");

        this.cardInputs = page.locator("[class*='input txt']");
        this.expirydateDropdown = page.locator("[class='input ddl']");

        this.selectCountry = page.locator("[placeholder*='Select Country']");
        this.countryDropdown = page.locator("[class*='ta-results']");
        this.countryDropdownBtn = this.countryDropdown.locator("[type='button']")

        this.assertMailId = page.locator(".user__name.mt-5 [type='text']").first();

        this.enterCoupon = page.locator("input[name=coupon]");
        this.applyCouponBtn = page.locator("button[class='btn btn-primary mt-1']");
        
        this.placeOrder = page.locator("text=Place Order");

        this.orderSuccess = page.locator(".hero-primary");
        this.orderID = page.locator("//label[@class='ng-star-inserted']");
    }

    async checkout(productName) {
        await this.page.locator("div li").first().waitFor();
        await expect(this.page.locator(`h3:has-text("${productName}")`)).toBeVisible();
        await this.checkoutBtn.click();
    }

    async enterPaymentDetails(CvvCode, cardName, month, year) {
        await this.expirydateDropdown.first().selectOption(month);
        await this.expirydateDropdown.last().selectOption(year);
        await this.cardInputs.nth(1).fill(CvvCode);
        await this.cardInputs.nth(2).fill(cardName);
    }

    async applyCoupon(couponID) {
        await this.enterCoupon.fill(couponID);
        await this.applyCouponBtn.click();
    }

    async selectCheckoutCountry(countryName) {
        const country = countryName.trim();
        await this.selectCountry.waitFor({ state: "visible" });
        await expect(this.selectCountry).toBeEditable();
        await this.selectCountry.click();
        await this.selectCountry.pressSequentially(countryName.trim().substring(0, 3));
        await this.countryDropdown.waitFor({ state: "visible" });
        await this.countryDropdownBtn.first().waitFor({ state: "visible" });
        const optionsCount = await this.countryDropdownBtn.count();

        for (let i = 0; i < optionsCount; i++) {
            const text = await this.countryDropdownBtn.nth(i).textContent();

            if (text?.trim() === country.trim()) {
                await this.countryDropdownBtn.nth(i).click();
                break;
            }
        }
    }



    async assertOrderMailID(orderMailID) {


        await expect(this.assertMailId).toHaveText(orderMailID);


    }

    async orderPlacement(ordermessage) {

        await this.placeOrder.click();
        await expect(this.orderSuccess).toHaveText(ordermessage);
    }

    async getOrderID() {
        return this.orderID.textContent();

    }

}



module.exports = { checkoutPageRefined }