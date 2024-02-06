import puppeteer from 'puppeteer';

// original attempt
//const pagetoscrape = 'https://www.daft.ie/for-sale/detached-house-killough-castle-killough-thurles-co-tipperary/5413440';
// first test
const pagetoscrape = 'https://www.daft.ie/for-sale/detached-house-the-lodge-oneill-street-clonmel-co-tipperary/3811431';

(async() => {
    // lunch a new brower instance
    const browser = await puppeteer.launch({ headless: false })
    // create a new page handle
    const page = await browser.newPage()
    // goto target page
    await page.goto( pagetoscrape , { timeout: 60000 } )

    // select address
    const addressElement = await page.$('[data-testid="address"]');
    const addressText = await page.evaluate(element => element.textContent, addressElement);
    console.log("address: "+addressText);

    // select price
    const priceElement = await page.$('[data-testid="price"]');
    const priceText = await page.evaluate(element => element.textContent, priceElement);
    console.log("price: "+priceText);

    // select bedrooms
    const bedElement = await page.$('[data-testid="beds"]');
    const bedText = await page.evaluate(element => element.textContent, bedElement);
    console.log("bedroom(s): "+bedText);

    // select bathrooms
    const bathElement = await page.$('[data-testid="baths"]');
    const bathText = await page.evaluate(element => element.textContent, bathElement);
    console.log("bathroom(s): "+bathText);

    
    // select floor area 
    const areaElement = await page.$('[data-testid="floor-area"]');
    const areaText = await page.evaluate(element => element.textContent, areaElement);
    console.log("total floor area: "+areaText);
    // TEST .replace(" m²","")

    // select description
    const descriptionElement = await page.$('[data-testid="description"]');
    const descriptionText = await page.evaluate(element => element.textContent, descriptionElement);
    console.log("description: "+descriptionText);

    // select features
    const featureElement = await page.evaluate(() => {
        const ulElement = Array.from(document.querySelectorAll('ul.PropertyDetailsList__PropertyDetailsListContainer-sc-1cjwtjz-0 li.PropertyDetailsList__PropertyDetailsListItem-sc-1cjwtjz-1'));
        return ulElement.map(item => item.innerText);
    });

    for (let i = 0; i < featureElement.length; i++) {
        console.log(featureElement[i]);
    }

    await browser.close()
})()
