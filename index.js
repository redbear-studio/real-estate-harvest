import puppeteer from 'puppeteer';

(async() => {
    // lunch a new brower instance
    const browser = await puppeteer.launch({ headless: false })
    // create a new page handle
    const page = await browser.newPage()
    // goto target page
    await page.goto( 'https://www.daft.ie/for-sale/detached-house-killough-castle-killough-thurles-co-tipperary/5413440' , { timeout: 60000 } )

    // select address
    const headings = await page.$$('h1');
    for (let index = 0; index < headings.length; index++) {
        const element = headings[index]
        const headingText = await page.evaluate(
            element => element.textContent , 
            element
        )
        console.log("address: "+headingText)
    }
    //  select price
    const headings1 = await page.$$('h2');
    for (let index = 0; index < headings1.length; index++) {
        const element1 = headings1[index]
        const headingText1 = await page.evaluate(
            element1 => element1.textContent , 
            element1
        )
        console.log("price: "+headingText1)
    }

    await browser.close()
})()
