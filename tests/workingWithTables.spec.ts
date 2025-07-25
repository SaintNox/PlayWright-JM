import {test, expect} from '@playwright/test'

test('test with tables', async ({page}) => {
    await page.goto('https://cosmocode.io/automation-practice-webtable/')

    const tableContainer = await page.locator("xpath=//table[@id='countries']")// se toma un elemento por el id de la tabla que se convertira en tableContainer

    const rows = await tableContainer.locator("xpath=.//tr").all() // Dentro del contenedor regitra todas las filas de la tabla y las asigna a rows

    const countries: Country[] = []// Se crea un arreglo de objetos Country que se llenara con los datos de la tabla osea inicialmente estara vacio

    console.log(rows.length)// longitud de las filas 

    for(let row of rows){
        const country: Country = {
            name: await row.locator('xpath=.//td[2]').innerText(),
            capital: await row.locator('xpath=.//td[3]').innerText(),
            currency: await row.locator('xpath=.//td[4]').innerText(),
            primaryLanguage: await row.locator('xpath=.//td[5]').innerText()
        }
        countries.push(country)
    }
    /*for(let country of countries){
        console.log(country)
    }*/
    const countryWherePeopleSpeakPortuguese = countries.filter(country => country.primaryLanguage === 'Portuguese')
    console.log('countryWherePeopleSpeakPortuguese:', countryWherePeopleSpeakPortuguese)

    // await page.screenshot({path: 'screenshots/tables.png', fullPage: true}) // Ejemplo de una captura de pantalla
})


interface Country {
    name: string;
    capital: string;
    currency: string;
    primaryLanguage: string;
}

/*
    element container: //table[@id='countries']
.//tr -> filas

.//table[@id='countries']//tr[2]//td[1] -> check
.//table[@id='countries']//tr[2]//td[2] -> Country
.//table[@id='countries']//tr[2]//td[3] -> Capital
.//table[@id='countries']//tr[2]//td[4] -> Currency
.//table[@id='countries']//tr[2]//td[5] -> Primary language

*/