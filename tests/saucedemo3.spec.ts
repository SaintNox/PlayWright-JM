import { test, expect } from '@playwright/test'
import { LoginPage } from './pageobjects/LoginPage'

test('Purchase an item', async ({page}) => {
    
    await page.goto('https://www.saucedemo.com/v1/')
    const login = new LoginPage(page)
    await login.loginWithCredentials('standard_user', 'secret_sauce')
    await login.checkSuccessfullLogin()

    const itemContainer = await page.locator('#inventory_container .inventory_item').all() //metodo all siempre devuelve una promesa que da el arreglo

    const randomIndex = Math.floor(Math.random() * itemContainer.length)

    const randomItem = itemContainer[randomIndex]

    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
    const expectedName = await randomItem.locator('.inventory_item_name').innerText()
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()
    
    console.log(`Price: ${expectedPrice} Name: ${expectedName} Description: ${expectedDescription}`)

    await randomItem.getByRole('button', {name: 'ADD TO CART'}).click() //no se usa page por que el uso va especifico al item seleccionado
        //y el page especifica a la pagina completa
    await page.locator('a.shopping_cart_link').click() //click en el carrito de compras

    //await page.pause()

    expect(page.getByRole('link', {name: 'CHECKOUT'})).toBeVisible()

    const actualName = await page.locator('.inventory_item_name').innerText()
    const actualPrice = await page.locator('.inventory_item_price').innerText()
    const actualDescription = await page.locator('.inventory_item_desc').innerText()

    expect(actualName).toEqual(expectedName)
    expect(actualPrice).toEqual(expectedPrice.replace('$', '')) // Eliminar el símbolo de dólar para la comparación
    expect(actualDescription).toEqual(expectedDescription)

})

test('test1', async ({page}) => {

    await page.goto('https://www.saucedemo.com/v1/')

    const login = new LoginPage(page)
    await login.loginWithCredentials('standard_user', 'secret_sauce')
    await login.checkSuccessfullLogin()
})


test('navigate', async ({page}) => {
    await page.goto(process.env.URL)
    await page.pause()
})