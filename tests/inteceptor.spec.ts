import { test, expect } from '@playwright/test'
import { LoginPage } from './pageobjects/LoginPage'

test('Interceptor Test', async ({page}) => {
    await page.on("request", req => {
        console.log(req.url())
    })

    await page.route("**/*.{png,jpg,jpeg,svg}", (route) => route.abort()) //intercepta todas las peticiones de imagenes y las bloquea antes de que lleguen al servidor 

    await page.goto('https://www.saucedemo.com/v1/')
    const login = new LoginPage(page)
    await login.loginWithCredentials('standard_user', 'secret_sauce')
    await login.checkSuccessfullLogin()

    const itemContainer = await page.locator('#inventory_container .inventory_item').all()
    await page.screenshot({path: "login.png", fullPage: true})
})