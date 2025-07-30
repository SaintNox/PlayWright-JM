import {test as setup, expect} from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';

const authFile = "playwright/.auth/user.json"

setup("authenticate", async ({page}) => {
    
    await page.goto('https://www.saucedemo.com/v1/')
    const login = new LoginPage(page)
    await login.loginWithCredentials('standard_user', 'secret_sauce')
    await login.checkSuccessfullLogin()
    await page.context().storageState({path: authFile}) //almacena el estado de la pagina en un archivo json
    
})