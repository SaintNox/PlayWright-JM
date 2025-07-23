import { expect, test } from '@playwright/test'

test ('Locators', async ({ page }) => {

    await page.goto('https://www.mercadolibre.com.mx/')

    await page.getByRole('link', { name: 'Mis compras', exact: true }).click() //true siempre se usa para no causar confusion con otros elementos que tengan el mismo nombre

    await page.pause()
})