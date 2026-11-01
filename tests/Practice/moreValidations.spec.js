const {test, expect} = require ("@playwright/test");

test('moreValidation', async({page})=>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

//await page.goto("https://google.com");
//await page.goBack();
//await page.goForward();
//await expect(page).toHaveURL("https://www.google.com");

await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();
page.on("dialog", dialog=> dialog.accept()); // accept() or dismiss()
await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();
const framePage = await page.frameLocator("iframe[id*='courses-iframe']");
await framePage.locator("li a[href*='lifetime']:visible").click();
const subscribersCount = await framePage.locator(".text h2").textContent();
console.log("Subscribers count is: ", subscribersCount.split(" ")[1]);







})