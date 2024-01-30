import puppeteer from "puppeteer";

const getPropertyData = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will be in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "https://www.daft.ie/for-sale/detached-house-killough-castle-killough-thurles-co-tipperary/5413440" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://www.daft.ie/for-sale/detached-house-killough-castle-killough-thurles-co-tipperary/5413440", {
    waitUntil: "domcontentloaded",
  });

  // Get page data
  const address = await page.evaluate(() => {
    // Fetch the first element with class "default_cursor_cs"
    // Get the displayed text and returns it
    const propAddr = document.querySelector(".default_cursor_cs");
    
    // Fetch the sub-elements from the previously fetched quote element
    // Get the displayed text and return it (`.innerText`)
    const propertyAddress = propAddr.querySelector(".TitleBlock__Address-sc-1avkvav-8 dzihxK default_cursor_cs").innerText;
    
    return { propertyAddress };
    });

  // Display the quotes
  console.log(address);

  // Click on the "Next page" button
  await page.click(".pager > .next > a");

  // Close the browser
  // await browser.close();
};

// Start the scraping
getPropertyData();
