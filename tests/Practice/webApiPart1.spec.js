const {test, expect, request} = require('@playwright/test');

const loginPaload= {userEmail: "alhaj.sharaf@gmail.com",userPassword: "Higooshosho98."};
const orderPayload = {
    orders: [
        {
            country: "Sudan",
            productOrderedId: "6960eac0c941646b7a8b3e68"
        }
    ]
}
let token;
let orderId;
test.beforeAll(async()=> {

const apiContext = await request.newContext();
const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {data: loginPaload}
    )
    await expect(loginResponse.ok()).toBeTruthy();
    const loginJson = await loginResponse.json();
    token = loginJson.token;
    console.log(token);

    const orderResposne = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {data: orderPayload,
        headers:
            {
                "Authorization": token,
                "Content-Type": 'application/json'
            }

        }
    )
    const orderResponseJson = await orderResposne.json();
    console.log("Response body: ", orderResponseJson);
    orderId = await orderResponseJson.orders[0];
    console.log("Order Id: ", orderId);


});

test.beforeEach(async()=>{
    
})


test("Place_Order", async ({page})=>{
page.addInitScript(value=> {
    window.localStorage.setItem('token', value)
},token
)

await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
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
await page.pause();

}
)