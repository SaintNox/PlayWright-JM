import { test, expect } from '@playwright/test'
import { LoginPage } from './pageobjects/LoginPage'

test('Interceptor Test2', async ({page}) => {

    await page.route("https://demoqa.com/BookStore/v1/Books", (route) => route.fulfill({// Intercepta la petición a el header de la página REVISAR SIEMPRE LAS MAYUSCULAS
        status: 304, // Simula una respuesta 304 Not Modified
        headers: {
            'Content-Type': 'application/json',
        },
        body: `{
    "books": [
        {
            "isbn": "9781449325862",
            "title": "EL LIBRO QUE NUNCA ESCRIBI YO",
            "subTitle": "A Working Introduction",
            "author": "Richard E. Silverman",
            "publish_date": "2020-06-04T08:48:39.000Z",
            "publisher": "O'Reilly Media",
            "pages": 220,
            "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
            "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
        }
    ]
}`
    }))
    await page.goto('https://demoqa.com/books')
    await page.pause()
    await page.screenshot({path: 'books.png',fullPage: true}) // Captura de pantalla de la página después de la interceptación
})