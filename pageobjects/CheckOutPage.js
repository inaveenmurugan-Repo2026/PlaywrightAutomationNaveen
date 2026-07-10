const { expect } = require('@playwright/test');

class checkOutPage {
    
    constructor(page) {
        this.page = page;
        this.checkoutBtn = page.locator("text = Checkout");

    }


    async checkOutOrderPlacement(productName) {
        await this.page.locator("div li").first().waitFor();
        await expect(
            this.page.locator(`h3:has-text("${productName}")`)
        ).toBeVisible();
        await this.checkoutBtn.click();

        await this.page.locator("[placeholder*='Select Country']").pressSequentially("Ind", { delay: 150 });
        const dropdown = await this.page.locator("[class*='ta-results']");

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


        const assertEmail = this.page.locator(".user__name.mt-5 [type='text']");
        //  const BillingEmail = await page.locator(".user__name.mt-5 [type='text']").textContent();

        await expect(assertEmail.first()).toHaveText("abc2611@gmail.com");

        console.log(await assertEmail.first().textContent());


        const CvvCode = this.page.locator("[class*='input txt']");

        await CvvCode.nth(1).fill("8667576");


        const dropdownExp = this.page.locator("[class='input ddl']");

        await dropdownExp.first().selectOption("10");

        await dropdownExp.last().selectOption("22");

        const CardName = this.page.locator("[class*='input txt']");
        await CardName.nth(2).fill("Naveen");



        const coupon = this.page.locator("input[name=coupon]");
        await coupon.fill("rahulshettyacademy");

        const Applycoupon = this.page.locator("button[class='btn btn-primary mt-1']");
        await Applycoupon.click();

        await this.page.locator("text=Place Order").click();

        await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        await this.page.pause();

        const OrderID = await this.page.locator("//label[@class='ng-star-inserted']").textContent(); // .em-spacer-1 .ng-star-inserted
        console.log(OrderID);


    }

}


module.exports = { checkOutPage };