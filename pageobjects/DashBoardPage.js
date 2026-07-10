const { expect } = require("@playwright/test");
class DashBoardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cartBtn = page.locator("[routerlink*='cart']");
    }

    async searchProductsAddtoCart(productName) {
        await this.productsText.first().waitFor();
        const titles = await this.productsText.allTextContents();
        console.log("Products Found:", titles)

        const count = await this.products.count();
        let productFound = false;

        for (let i = 0; i < count; i++) {
            const actualProduct = await this.products.nth(i).locator("b").textContent();

            if (actualProduct === productName) {
                console.log("ActualProduct:", actualProduct);
                console.log("ExpectedProduct:", productName);
                productFound = true;
                await this.products.nth(i).locator("text=Add to Cart").click();
                break;
            }
        }
        expect(productFound).toBeTruthy();

    }

    async navigateToCartPage() {
        await this.cartBtn.click();
        await this.page.waitForLoadState("networkidle");
    }

    async verifyTitle(Expectedtitle) {
        await expect(this.page).toHaveTitle(Expectedtitle);
    }

}


module.exports = { DashBoardPage };