class DashboardPage{

    constructor(page){
        this.page=page;

        this.products = page.locator(".card-body");
        this.productsTitles = page.locator(".card-body b");
        this.cart= page.locator("[routerlink*='cart']");

    }

    async searchProductAddCart(productTitle){
        await this.products.filter({hasText: productTitle}).getByRole("button", {name: "Add To Cart"}).click();

    }

    async navigateToCart(){
        await this.cart.click();

    }
}
module.exports = {DashboardPage}