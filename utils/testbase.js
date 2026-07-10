const { test: base } = require('@playwright/test');

exports.customtest = base.extend({

    testDataForLogin: {
        username: "abc2611@gmail.com",
        password: "Test@123",
        productName: "iphone 13 pro",
        dashboardTitle: "Let's Shop"

    }

})