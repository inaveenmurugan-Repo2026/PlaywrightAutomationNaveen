class ApiUtils {
    constructor(apicontext, loginPayLoad) {

        this.apicontext = apicontext; // this refers to current class...we are assigning webapi apicontext-> to local class object  apicontext
        this.loginPayLoad = loginPayLoad; //passing loginpayload 
    }

    async getToken(loginPayLoad) {
        const loginrespose = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",

            {
                data: this.loginPayLoad
            }
        )//200,201
        // expect(loginrespose.ok()).toBeTruthy();
        const loginjson = await loginrespose.json();
        const token = loginjson.token;
        console.log("token : ", token);
        return token;


    };
    async createOrder(createOrderRequestPayload) { // if we are using async we have to await on actions

        let response = {};

        response.token = await this.getToken();

        const createOrderResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",


            {
                data: createOrderRequestPayload,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                }
            }
        )

        const orderResponsejson = await createOrderResponse.json();
        console.log(orderResponsejson);

        const orderID = orderResponsejson.orders[0];
        response.orderID = orderID;


        return response;
    }



};

module.exports = { ApiUtils }; // now this class file is visible and acccessible to all class in our project.

//  expect(createOrderResponse.ok()).toBeTruthy();