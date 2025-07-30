import { test, expect } from '@playwright/test'
import { LoginPage } from './pageobjects/LoginPage'

test('Purchase an item', async ({page}) => {
    
    await page.goto('https://www.saucedemo.com/v1/')


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

test('test1', async ({page}, testInfo) => {

    await page.goto('https://www.saucedemo.com/v1/')
    await testInfo.attach('login',{
        body: await page.screenshot(),
        contentType: 'image/png',//forma de adjuntar una captura de pantalla al reporte
    })
    const login = new LoginPage(page)
    await login.loginWithCredentials('standard_user', 'secret_sauce')
    await login.checkSuccessfullLogin()
})


test('navigate', async ({page}) => {
    await page.goto(process.env.URL)
    await page.pause()
})


test('Purchase an item4', async ({page}) => {
    
    await page.goto('https://www.saucedemo.com/v1/')


    const itemContainer = await page.locator('#inventory_container .inventory_item').all() //metodo all siempre devuelve una promesa que da el arreglo
    for(let container of itemContainer){
        console.log(await container.allTextContents())
    }
})

test('Login and add two items to cart', async ({page}) => {
    // Navigate to the site
    await page.goto('https://www.saucedemo.com/v1/')
    
    // Login with credentials
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user')
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce')
    await page.getByRole('button', { name: 'LOGIN' }).click()
    
    // Wait for inventory page to load
    await page.waitForSelector('#inventory_container')
    
    // Get all available items
    const itemContainer = await page.locator('#inventory_container .inventory_item').all()
    
    // Add first item to cart
    const firstItem = itemContainer[0]
    await firstItem.getByRole('button', {name: 'ADD TO CART'}).click()
    console.log('First item added to cart')
    
    // Add second item to cart  
    const secondItem = itemContainer[1]
    await secondItem.getByRole('button', {name: 'ADD TO CART'}).click()
    console.log('Second item added to cart')
    
    // Verify cart has 2 items
    const cartBadge = page.locator('.shopping_cart_badge')
    await expect(cartBadge).toHaveText('2')
    
    // Optional: Click cart to view items
    await page.locator('a.shopping_cart_link').click()
    
    // Verify both items are in the cart
    const cartItems = await page.locator('.cart_item').all()
    expect(cartItems.length).toBe(2)
    
    console.log('Successfully added 2 items to cart!')
})
