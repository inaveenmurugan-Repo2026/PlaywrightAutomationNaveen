const { test, expect } = require('@playwright/test'); // expect is an assertion
const { constants } = require('node:buffer');
const { isContext } = require('node:vm');
// USE!!!! await only when u performing an action,  dont use await when u storing it in const.
//USE !! async means it wont wait for specfic action to perform, instead it will move next action and in parallel in it will wait for stipulated actions.


//to run parallel in same test...

test.describe.configure({ mode: 'parallel' });


test('First play wright Test', async ({ page }) => {
    //chrome -Plugin / cookies
    // const context =await browser.newContext()
    // const page = await context.newPage()
    await page.goto("https://playwright.dev/")
    console.log(await page.title());
    await expect(page).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");
});

test('Second play wright Test', async ({ page }) => {
    await page.goto("https://google.com");
    console.log(await page.title);
    console.log(await expect(page).toHaveTitle("Google"));
    // Fill search box
    await page.locator('textarea[name="q"]').fill('cm of tamilnadu');
    // Press Enter
    await page.keyboard.press('Enter');
});


test.skip('Testcase_03 using Expect-asssertions', async ({ page }) => {
    //  page.route('**/*.css', route => route.abort()); // it will block 
    // all the css files to load in the browser. 
    // it will make the page to load faster. (we can use this for performance testing also)



    await page.goto("https://rahulshettyacademy.com/loginpagePractise");

    //console.log(await page.title);
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    // css (prefered),xpath. (fill-to provide input-)


    await page.locator("#username").fill("rahulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator("input#signInBtn").click();
    console.log("This is the Error Message: " + await page.locator("[style*='block']").textContent());

    await expect(page.locator("[style*='block']")).toContainT("Incorrect");

});


test.skip('TestCase04 Extracting mutiple locators', async ({ page }) => {

    const UserName = page.locator("#username");
    const Pwd = page.locator("[type='password']");
    const SignIn = page.locator("input#signInBtn");
    const CardTitles = page.locator(".card-body a");

    page.route('*/**.css', route => route.abort()); // it will block all the css files to load in the browser. it will make the page to load faster. (we can use this for performance testing also)

    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));


    // it will print all the request url in the console. 
    // we can use this for debugging purpose to find out which request is taking more time to load or which request is failed.)
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");


    page.route('**/*.{png,jpg,jpeg}', route => route.abort());
    await UserName.fill(""); // it will clear the existing any text.
    await UserName.fill("rahulshettyacademy");
    await Pwd.fill("Learning@830$3mK2");
    await SignIn.click();

    console.log(await page.locator(".card-body a").nth(0).textContent());
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(2).textContent());
    //console.log(await page.locator(".card-body a").last().textContent());
    const allTitles = await CardTitles.allTextContents();
    console.log(allTitles);

    await page.pause();
    // console.log(await page.locator(".card-body a").allTextContents()); // since await will not be worked for allTextContents in future we have to provide atleast one selectable array value to get all titles.

});




test.skip('TestCase_04 Login and Get Title', async ({ page }) => {

    const pageUrl = ("https://rahulshettyacademy.com/client/#/auth/login");
    const emailID = page.locator("[type*='email']"); // can use #username -css #password
    const password = page.locator("[type*='password']");
    const LoginBtn = page.locator("[type='submit']");

    await page.goto(pageUrl);

    console.log("Email Filled : " + (await emailID.fill("abc2611@gmail.com")));
    console.log("Password Entered: " + await password.fill("Test@123"));
    console.log("Clicked Login: " + await LoginBtn.click());

    await page.waitForLoadState("networkidle"); // order of writing code is impt! it will read line by line. (// it will make the locator to wait untill the network settles and grab all the details from the DOM.)
    //await page.locator(".card-body").first().waitFor();  //alternate best practice suggested by Chatgpt
    //await page.locator(".card-body").waitFor(); //when u found only one element use this  
    const titles = await page.locator("[class='card-body'] b").allTextContents();



    console.log(titles);


    // console.log( await page.locator("[class='card-body'] b").nth(0).textContent());
});



test.skip('TestCase_05 DropdownScenarios', async ({ page }) => {

    const pageUrl = ("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const pwd = page.locator("#password");
    const signIn = page.locator("#signInBtn");

    await page.goto(pageUrl);
    await userName.fill("rahulshettyacademy");
    await pwd.fill("Learning@830$3mK2");

    //await signIn.click();


    const radiobtn = page.locator("//input[@value='user']");

    await radiobtn.click();

    const dropDown = page.locator("[data-style='btn-info']");
    await dropDown.selectOption("Teacher");
    await page.locator("#okayBtn").click();
    await page.pause();
});

test.skip('TestCase06_Assertions', async ({ page }) => {

    const pageUrl = ("https://rahulshettyacademy.com/loginpagePractise/");
    const Username = page.locator("#username");
    const Password = page.locator("#password");

    const Signin = page.locator("#signInBtn");
    const blink1 = page.locator("[href*='documents']");
    const blink2 = page.locator("[href*='techs']");

    await page.goto(pageUrl);

    await Username.fill("rahulshettyacademy");
    await Password.fill("Learning@830$3mK2");

    const RadioBtn = page.locator("//input[@value='user']");
    await RadioBtn.click();

    await expect(RadioBtn).toBeChecked();
    console.log(await page.locator("//input[@value='user']").isChecked());

    const Dropdown = page.locator("[data-style='btn-info']");

    await Dropdown.selectOption("Teacher");

    await page.locator("#okayBtn").click();

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();

    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); //here the action is performed inside bracket so we used.

    //  await page.pause();

    await expect(blink1).toHaveAttribute("class", "blinkingText");
    await expect(blink2).toHaveAttribute("class", "blinkingText");

    await Signin.click();
});



test(' @WebsmokeTest TestCase_07 handling child window', async ({ browser }) => { //using this we are creating new session for new page

    const context = await browser.newContext(); //context is an object
    const page = await context.newPage();
    const pageUrl = ("https://rahulshettyacademy.com/loginpagePractise/");
    const blink1 = page.locator("[href*='documents']");

    await page.goto(pageUrl);

    await expect(blink1).toHaveAttribute("class", "blinkingText");



    const [page2] = await Promise.all( //Note: if another child window opens access by creating another object in array[page2,page3]

        [
            context.waitForEvent('page'), //this listener will wait for [pending,fullfilled or rejected] the new page is created. it should be triggered when any page is about to run in background
            blink1.click(), //these array function will keep running untill the array functions are fulfilled.
            //if any of this is failed the script will be rejected.
        ])//new page opened once its executed we can further continue the operations with the new page


    await expect(page2.locator("[class='im-para red']")).toContainText("Please email us at"); //tobechecked is only for checkboxes or radio buttons.

    //there is a requirement where we need to split the text and take one half and store it in array.    

    const redtext = await page2.locator("[class='im-para red']").textContent(); // textContent will work only when the text is attached to DOM- but we have alternate{inputvalue()}
    console.log(redtext);
    const arrayText = redtext.split("@");
    const email = arrayText[1].split(" ")[0]; //the splited text will be considered as arrays[0]-leftpart array[1]rightpart

    //console.log(email);
    // use---> textcontent() --- when u need to print DOM attached text for ex:username, password,signin.
    // use---> inputValue() ----when u need to print text which u entered in the DOM for ex: entering username,pwd,etc.

    await page.locator("#username").fill(email);
    await page.pause();
    console.log(await page.locator("#username").inputValue());




    console.log("Using parallel Execution through test.describe")
});


