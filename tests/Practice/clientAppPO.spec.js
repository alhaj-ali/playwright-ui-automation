const {test, expect} = require ('@playwright/test');
const {POManager} = require ('../../pages/POManager');
const dataSet = JSON.parse(JSON.stringify(require('../../utils/TestDataManager')))

for (const data of dataSet) {
test(`Place_Order ${data.productName}`, async ({page})=>{
const poManager = new POManager(page);


const loginPage = poManager.getLoginPage();
await loginPage.goTo()
await loginPage.login(data.username, data.password);
const dashboardPage = poManager.getDashboardPage();
await dashboardPage.searchProductAddCart(data.productName);
await dashboardPage.navigateToCart();


await page.locator("ul.cartWrap.ng-star-inserted").first().waitFor();
const bool = await page.locator(`h3:has-text('${data.productName}')`).isVisible();
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
}

test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "alhaj.sharaf@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Higooshosho98.");
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})