import { expect } from "@playwright/test"
import { Locator, Page } from "playwright-core"



export class LoginPage { 

    private readonly usernameTextbox: Locator
    private readonly passwordTextbox: Locator
    private readonly loginButton: Locator
    private readonly shoppingCartIcon: Locator

    constructor(page : Page){//localizacion de los elementos de la pagina
        this.usernameTextbox = page.getByRole('textbox', { name: 'Username'})
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password'})
        this.loginButton = page.getByRole('button', { name: 'LOGIN'})
        this.shoppingCartIcon = page.locator("xpath=//a[contains(@class,'shopping_cart_link')]")
    }

    async fillUsername(username: string){ // acciones que se pueden hacer con los elementos de la pagina
        await this.usernameTextbox.fill(username)
    }

    async fillPassword(password: string){
        await this.passwordTextbox.fill(password)
    }

    async clickLoginButton(){
        await this.loginButton.click()
    }

    async loginWithCredentials(username: string, password: string) {
        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.clickLoginButton()
    }

    async checkSuccessfullLogin() {
    await expect(this.shoppingCartIcon).toBeVisible()
    }
}