const {test, expect} = require ('@playwright/test');
const { text } = require('node:stream/consumers');


test("Place_Order", async ({page})=>{
const products = page.locator(".card-body");
const productTitle = "ZARA COAT 3";
const email = page.locator("#userEmail");
const password = page.locator("#userPassword");
const login = page.locator("[name='login']");

await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
console.log(await page.title());
await expect(page).toHaveTitle("Let's Shop")
await email.fill("alhaj.sharaf@gmail.com");
await password.fill("Higooshosho98.");
await login.click();
await page.locator(".card-body b").last().waitFor();
await page.waitForLoadState("networkidle");
console.log(await page.locator(".card-body b").first().textContent());
await expect(page.locator(".card-body b").first()).toContainText("Adidas", {ignoreCase: true});
const titles = await page.locator(".card-body b").allTextContents();
console.log("Titles are: " , titles);
const count = await products.count();

for (let i=0; i < count; ++i){

    if (await products.nth(i).locator("b").textContent() === productTitle){

        await products.nth(i).locator("text= Add To Cart").click();
        break;

    }
}

await page.locator("[routerlink*='cart']").click();
await page.locator("ul.cartWrap.ng-star-inserted").first().waitFor();
const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
await expect(bool).toBeTruthy();
await page.locator("text=Checkout").click();

await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay:100});
await page.locator(".ta-results").waitFor();
const dropdown = page.locator(".ta-results");
const ddcount = await dropdown.locator("button").count();
for (let i=0; i<ddcount; ++i){

    if (await dropdown.locator("button").nth(i).textContent() === " India"){
        await dropdown.locator("button").nth(i).click();
        break;
    }
}

await page.locator(".btnn.action__submit.ng-star-inserted").click();
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderId = await page.locator(".em-spacer-1 [class*='ng-star-inserted']").textContent();
console.log("Your order id is: ", orderId);
await page.locator("[routerlink*='myorders']").first().click();
await page.locator("tbody").waitFor();
const rows = page.locator("tbody tr");
const ordersConunt = await rows.count();

for (let i=0; i<ordersConunt; ++i){
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)){
        await rows.nth(i).locator("button").first().click();
        break;
    }
}
await expect(page.locator(".email-title")).toHaveText(" order summary ");
const SumOrderId = await page.locator(".col-text").textContent();
await expect(orderId.includes(SumOrderId)).toBeTruthy();
//await page.pause();

}
)