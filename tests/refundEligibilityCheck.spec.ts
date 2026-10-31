import {test, expect} from "@playwright/test";


test("Setup", async ({ page }) => {
  //Step1
  const email = "testermt@email.com";
  const password = "Tester1234_";
  await page.goto("https://eventhub.rahulshettyacademy.com");
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.locator("#login-btn").click();
  await page.waitForLoadState("networkidle");
  await page.getByText("Discover & Book").waitFor();
//Step2
  await page.getByRole("button", { name: "Events" }).click();
  await page.getByTestId("event-card").first().getByTestId("book-now-btn").click();
  await page.locator("#customerName").fill("Tester Mt");
  await page.locator("#customer-email").fill("testermt@email.com");
  await page.getByPlaceholder("+91 98765 43210").fill("1234567890");
  await page.locator(".confirm-booking-btn").click();

  //Step3

    await page.getByRole("button", { name: "View My Bookings" }).click();
    
      await expect(page).toHaveURL(
    "https://eventhub.rahulshettyacademy.com/bookings",
  );

    const eventTitle = await page
    .locator("#booking-card").first()
    .locator("h3")
    .textContent();
  console.log(eventTitle);

  await page.locator('button').filter({ hasText: 'View Details' }).first().click();
await page
    .locator("h1")
    .filter({ hasText: eventTitle! })
    .isVisible();
  //step 4
const rawBookingRef = await page.locator('span.text-gray-900.font-mono').textContent();
const bookingRef = rawBookingRef?.trim() || "";
const cleanedEventTitle = eventTitle?.trim() || "";

const firstCharBookingRef = bookingRef.charAt(0);
const firstCharEventTitle = cleanedEventTitle.charAt(0);

console.log(`Comparing: '${firstCharBookingRef}' with '${firstCharEventTitle}'`);

expect(firstCharBookingRef).toBe(firstCharEventTitle);

 //step 5
 await page.getByTestId("check-refund-btn").click();
 await expect(page.locator("#refund-spinner")).toBeVisible();
  await expect(page.locator("#refund-spinner")).not.toBeVisible({ timeout: 1000*6 });

//step 6
  await expect(page.locator("#refund-result")).toBeVisible();
  const refundMessage = await page.locator("#refund-result").textContent();
  console.log(`Refund message: ${refundMessage}`);
  expect(refundMessage).toContain("Single-ticket bookings qualify for a full refund");
});

test("Test 2 — Group ticket booking is NOT eligible for refund", async ({ page }) => {
  //Steps 1–2 
  const email = "testermt@email.com";
  const password = "Tester1234_";
  await page.goto("https://eventhub.rahulshettyacademy.com");
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.locator("#login-btn").click();
  await page.waitForLoadState("networkidle");
  await page.getByText("Discover & Book").waitFor();
//Step2
  await page.getByRole("button", { name: "Events" }).click();
  await page.getByTestId("event-card").first().getByTestId("book-now-btn").click();
  await page.getByRole('button', { name: '+' }).click({clickCount: 2});
  await page.locator("#customerName").fill("Tester Mt");
  await page.locator("#customer-email").fill("testermt@email.com");
  await page.getByPlaceholder("+91 98765 43210").fill("1234567890");
  await page.locator(".confirm-booking-btn").click();

  //Step3

    await page.getByRole("button", { name: "View My Bookings" }).click();
    
      await expect(page).toHaveURL(
    "https://eventhub.rahulshettyacademy.com/bookings",
  );

    const eventTitle = await page
    .locator("#booking-card").first()
    .locator("h3")
    .textContent();
  console.log(eventTitle);

  await page.locator('button').filter({ hasText: 'View Details' }).first().click();
await page
    .locator("h1")
    .filter({ hasText: eventTitle! })
    .isVisible();
  //step 4
const rawBookingRef = await page.locator('span.text-gray-900.font-mono').textContent();
const bookingRef = rawBookingRef?.trim() || "";
const cleanedEventTitle = eventTitle?.trim() || "";

const firstCharBookingRef = bookingRef.charAt(0);
const firstCharEventTitle = cleanedEventTitle.charAt(0);

console.log(`Comparing: '${firstCharBookingRef}' with '${firstCharEventTitle}'`);

expect(firstCharBookingRef).toBe(firstCharEventTitle);

 //step 5
 await page.getByTestId("check-refund-btn").click();
 await expect(page.locator("#refund-spinner")).toBeVisible();
  await expect(page.locator("#refund-spinner")).not.toBeVisible({ timeout: 1000*6 });
  await expect(page.locator("#refund-result")).toContainText("Not eligible for refund.");
   await expect(page.locator("#refund-result")).toContainText("Group bookings (3 tickets) are non-refundable.");
});