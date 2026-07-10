const { test, expect } = require("@playwright/test");
const console = require("node:console");

async function login(page) {

    const LoginPage = ("https://eventhub.rahulshettyacademy.com/login");
    const UserMail = ("inaveenmurugan@gmail.com");
    const PassWord = ("1234567890A@");

    await page.goto(LoginPage);
    await page.getByPlaceholder("you@email.com").fill(UserMail);
    await page.getByPlaceholder("••••••").fill(PassWord);
    await page.getByRole('button', { name: 'Sign In' }).click();
    //await expect(page.getByText("Browse Events →")).toBeVisible();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

};

test('CreateNewEvent_TestCase_002', async ({ page }) => {

    const date = new Date();
    date.setDate(date.getDate() + 5);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    // Format exactly as the DOM requires: YYYY-MM-DDTHH:mm
    const futureDateISO = `${year}-${month}-${day}T12:00`;



    const eventTitle = page.locator("#event-title-input");
    const desc = page.locator("#admin-event-form textarea");
    const catagory = page.getByLabel("Category");
    const city = page.locator("#city");
    const venue = page.getByPlaceholder("Venue name & address");
    const evendate = page.locator("//input[@id='event-date-&-time']");
    const price = page.locator("//input[@id='price-($)']");
    const totalSeats = page.getByPlaceholder("e.g. 500");
    const addEvent = page.getByRole('button', { name: '+ Add Event' });
    const eventCreatedpopup = page.getByText('Event created!');

    await login(page);

    await page.locator("#nav-events").click();
    await page.getByRole('button', { name: "Add New Event" }).click();


    await eventTitle.fill("EventAssignment_OGN");
    await desc.fill("what you seek will taught to sweet..!");
    await catagory.selectOption('Sports');
    await city.fill("coimbatore");
    await venue.fill("coimbatore");
    await price.fill("200");
    await totalSeats.fill("2000");
    await evendate.fill(futureDateISO);
    await addEvent.click();
    await expect(eventCreatedpopup).toBeVisible();
    console.log(await eventCreatedpopup.textContent());

});

test('findEvenCards_TestCase_03', async ({ page }) => {
    await login(page);

    const eventPage = page.locator("#nav-events");
    const eventCards = page.getByTestId("event-card");
    const myEventTitle = ("EventAssignment_OGN");
    const SeatCount = ("5000");

    await eventPage.click();
    await page.waitForLoadState('networkidle');
    await eventCards.first().isVisible();
    const totalevents = await eventCards.count();
    console.log(totalevents);
    for (let i = 0; i < totalevents; i++) {
         await eventCards.nth(i).waitFor();
        const eventtext = await eventCards.nth(i).locator('h3').textContent();


        if (eventtext && eventtext.includes(myEventTitle)) {
            console.log("Found:", eventtext);
            const seatsleft = await eventCards.nth(i).locator('[class="text-xs font-semibold text-emerald-600"]').textContent();
            expect(seatsleft).not.toBeNull();
            await expect(eventCards.nth(i)).toBeVisible();
            const seatsBeforeBooking = seatsleft.split(' ')[0];
            console.log(seatsBeforeBooking);
            await expect(eventCards.nth(i).locator("#book-now-btn")).toBeVisible();
            await page.pause();
            await eventCards.nth(i).getByRole('button', { name: "Book Now" }).click();

            await expect(page.locator("#confirm-booking")).toBeVisible();
            console.log("visible")


        }
    }

    const Cb_fullname = page.getByPlaceholder("Your full name");
    const cb_mail = page.getByLabel("Email");
    const cb_mob = page.getByPlaceholder("+91 98765 43210");
    const cb_UserMail = ("inaveenmurugan@gmail.com");
    const mobNum = ("1234567890");
    const confirmBooking = page.locator("#confirm-booking");

    await page.pause();


    await Cb_fullname.fill("Naveen_Demo_Booking");
    await cb_mail.fill(cb_UserMail);
    await cb_mob.fill(mobNum);
    await page.pause();
    await confirmBooking.click();

    await expect(page.getByText("Your tickets are reserved.")).toBeVisible();

    const bookRef = await page.locator(".booking-ref ").first().innerText();
    console.log(bookRef);


    await page.getByRole('button', { name: "View My Bookings" }).click();
    await page.pause();
    const mybookinglink = page.locator("#nav-bookings");
    await expect(page.url().includes('bookings')).toBeTruthy();

    const allBookingCards = page.locator("#booking-card");

    await expect(allBookingCards.first()).toBeVisible();

    const allBookCount = await allBookingCards.count();

    for (let i = 0; i < allBookCount; i++) {

        const matchbookref = await allBookingCards.nth(i).innerText();




        if (bookRef && bookRef.includes(matchbookref)) {
            console.log("bookRef:", bookRef);
            console.log("matchbookref:", matchbookref);
            await expect(matchbookref).isVisible();

            await expect(matchbookref).toContain(myEventTitle);
        }

    }

    const seatCountbeforeBookings = myEventTitle
    await eventPage.click();

    await eventCards.first().isVisible();

    await eventCards.filter({ hasText: myEventTitle }).isVisible();



    for (let i = 0; i < totalevents; i++) {
        const eventtext = await eventCards.nth(i).textContent();


        if (eventtext && eventtext.includes(myEventTitle)) {
            console.log("Found:", eventtext);
            const seatsleft = await eventCards.nth(i).locator('[class="text-xs font-semibold text-emerald-600"]').textContent();
            eventCards.filter({ hasText: myEventTitle }).first();

            const seatsBeforeBooking = seatsleft?.split(' ')[0];

            const seatsleft2 = await eventCards.nth(i).locator(('[class="text-xs font-semibold text-emerald-600"]')).textContent();
            eventCards.filter({ hasText: myEventTitle }).first();
            const seatsAfterBooking = seatsleft2?.split(' ')[0];

            console.log(seatsAfterBooking);
            console.log(seatsBeforeBooking);


        }

    }



});
