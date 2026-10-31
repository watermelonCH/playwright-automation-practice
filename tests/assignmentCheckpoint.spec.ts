import { test, expect } from "@playwright/test";

test("assignment checkpoint", async ({ page }) => {
  //js file- Login js, DashboardPage
  const tomorrowTs = Date.now() + 1 * 24 * 60 * 60 * 1000;
  const email = "testermt@email.com";
  const password = "Tester1234_";
  await page.goto("https://eventhub.rahulshettyacademy.com");
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.locator("#login-btn").click();
  await page.waitForLoadState("networkidle");
  await page.getByText("Discover & Book").waitFor();

  await page.getByRole("button", { name: "Admin" }).click();
  await page.locator("a").filter({ hasText: "Manage Events" }).first().click();
  await page
    .locator("#event-title-input")
    .fill("Playwright Automation Test Event");
  await page
    .locator("#admin-event-form textarea")
    .fill("This is a test event created using Playwright automation.");
  await page.getByLabel("City").fill("BKK");
  await page.getByLabel("Venue").fill("123 Test Street");
  await page
    .getByLabel("Event Date & Time")
    .fill(new Date(tomorrowTs).toISOString().slice(0, 16));
  await page.getByLabel("Price ($)").fill("100");
  await page.getByLabel("Total Seats").fill("10");
  await page.locator("#add-event-btn").click();
  await page.waitForLoadState("networkidle");
  await expect(page.getByText("Event created!")).toBeVisible();

  await page.locator("#nav-events").click();
  await page
    .getByTestId("event-card")
    .filter({ hasText: "Hollywood Monsoon Night — Los Angeles" })
    .isVisible({ timeout: 5000 });
  const textNumSeatBeforeBooking = await page
    .getByTestId("event-card")
    .filter({ hasText: "Hollywood Monsoon Night — Los Angeles" })
    .locator("span")
    .filter({ hasText: "seats available" })
    .textContent();
  const arrayTextNumSeatBeforeBooking = textNumSeatBeforeBooking!.split(" ");
  const numSeatsBeforeBooking = arrayTextNumSeatBeforeBooking[0];
  console.log(numSeatsBeforeBooking);

  await page
    .getByTestId("event-card")
    .filter({ hasText: "Hollywood Monsoon Night — Los Angeles" })
    .getByTestId("book-now-btn")
    .filter({ hasText: "Book Now" })
    .click();
  await page.getByLabel("Full Name").fill("Tester Mt");
  await page.locator("#customer-email").fill("testermt@email.com");
  await page.getByPlaceholder("+91 98765 43210").fill("1234567890");
  await page.locator(".confirm-booking-btn").click();

  await page.locator(".booking-ref").first().isVisible();
  const bookingRef = await page.locator(".booking-ref").first().textContent();
  console.log(bookingRef);

  await page.getByRole("button", { name: "View My Bookings" }).click();
  await expect(page).toHaveURL(
    "https://eventhub.rahulshettyacademy.com/bookings",
  );
  await expect(page.locator("#booking-card").first()).toBeVisible();
  const eventTitle = await page
    .locator("#booking-card")
    .filter({ has: page.locator(".booking-ref") })
    .filter({ hasText: bookingRef! })
    .locator("h3")
    .textContent();
  console.log(eventTitle);

  await page.goto("https://eventhub.rahulshettyacademy.com/events");

  await page.getByTestId("event-card").first().isVisible();
  await page
    .getByTestId("event-card")
    .filter({ hasText: eventTitle! })
    .isVisible();

  const textNumSeatAfterBooking = await page
    .getByTestId("event-card")
    .filter({ hasText: eventTitle! })
    .locator("span")
    .filter({ hasText: "seats available" })
    .textContent();
  const arrayTexNumSeatAfterBooking = textNumSeatAfterBooking!.split(" ");
  const numSeatsNumSeatAfterBooking = arrayTexNumSeatAfterBooking[0];
  console.log(numSeatsNumSeatAfterBooking);

  console.log(typeof numSeatsBeforeBooking);
  console.log(typeof numSeatsNumSeatAfterBooking);

  await expect(+numSeatsNumSeatAfterBooking).toBe(+numSeatsBeforeBooking - 1);
});
