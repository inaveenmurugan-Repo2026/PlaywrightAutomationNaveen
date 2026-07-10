const { expect } = require("@playwright/test");
class LoginPage {

    constructor(page) {
        this.page = page;
        this.loginBtn = page.locator("#login"); //why we are creating this constructor because we want to use this loginBtn in other class and we want to make it global variable so that we can use it in other class. when we are creating an object of this class then this constructor will be called automatically and this loginBtn will be initialized with the locator. so that we can use this loginBtn in other class.
        //basically to access the constructor we need to use this keyword. this keyword is used to access the properties and methods of the class. this keyword is used to refer to the current instance of the class. this keyword is used to access the properties and methods of the class. this keyword is used to refer to the current instance of the class.
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    }

    async validLogin(username, password) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
        await this.page.waitForLoadState("networkidle"); // will wait untill next page is loaded and network is idle. this is the best practice to use this method because it will wait untill the page is loaded and network is idle. so that we can avoid the error of element not found. because if we are not using this method then it will try to find the element before the page is loaded and it will throw the error of element not found. so that we can avoid this error by using this method.
    }

    async invalidLogin(username, password) {

        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();

    }

}

// to use this class across project export 

module.exports = { LoginPage }; 