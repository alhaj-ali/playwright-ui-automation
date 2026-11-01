const data = JSON.parse(JSON.stringify(require('../utils/TestDataManager')))


class LoginPage {

    constructor(page){
        this.page=page;

        this.email= page.getByPlaceholder("email@example.com");
        this.password= page.locator("#userPassword");
        this.loginBtn= page.getByRole("button", {name: "Login"});
    }

    async goTo(){

        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async login(email, password){
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginBtn.click();
        await this.page.waitForLoadState("networkidle");

    }
}
module.exports = {LoginPage}