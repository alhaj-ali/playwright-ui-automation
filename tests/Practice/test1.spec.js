const {test, expect} = require ('@playwright/test');
const { sign } = require('node:crypto');



test('Login', async ({page})=>
{
const username = page.locator("#username");
const password = page.locator("[type='password']");
const signInBtn= page.locator("#signInBtn");
const cardTitles = page.locator(".card-body a");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
await username.fill("rahulshetty");
await password.fill("Learning@830$3mK2");
await signInBtn.click();
console.log(await page.locator("[style*='block']").textContent());
await expect (page.locator("[style*='block']")).toContainText("Incorrect");
await username.fill("");
await username.fill("rahulshettyacademy");
await signInBtn.click();
console.log(await cardTitles.first().textContent());
console.log(await cardTitles.nth(1).textContent());
console.log(await cardTitles.allTextContents());

});


test("Assert", async ({page})=>{

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

}

)


test("SelectOption", async({page})=>{

const docLink = page.locator("[href*='documents']");
const username = page.locator("#username");
const password = page.locator("[type='password']");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await username.fill("rahulshetty");
await password.fill("Learning@830$3mK2");
const dropdown = page.locator("select.form-control")
await dropdown.selectOption("stud");
await page.locator(".radiotextsty").last().click();
console.log("RadioBtnChecked? ", await page.locator(".radiotextsty").last().isChecked());
await expect(page.locator(".radiotextsty").last()).toBeChecked();
await page.locator("#okayBtn").click();
await page.locator("#terms").click();
await expect (page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
expect (await page.locator("#terms").isChecked()).toBeFalsy();
await expect(docLink).toHaveAttribute("class", "blinkingtext", {ignoreCase: true});

//await page.pause();


})

test("ChildWindow", async({browser})=>{

const context = await browser.newContext();
const page = await context.newPage();

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

const docLink = page.locator("[href*='documents']");
const username = page.locator("#username");
const password = page.locator("[type='password']");

const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    docLink.click(),
])

//await newPage.waitForLoadState();

const text = await newPage.locator(".red").textContent();
console.log(text);
const ArrayText = text.split("@")
const domain = ArrayText[1].split(" ")[0]
console.log("Extracted text is: ", domain);

await username.fill(domain);
//await page.pause();
console.log("The username filled with: ", await username.inputValue());

})