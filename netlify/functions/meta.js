import chromium from "chrome-aws-lambda"
import puppeteer from "puppeteer-core"

export const handler = async () => {
    
    //preparing browser
    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath, // process.env.CHROME_EXECUTABLE_PATH || 
        headless: true
    })
    
    //preparing page
    const page = await browser.newPage()

    // go to google flights website
    const google_website = "https://www.google.com/travel/explore?tfs=CBwQAxoaagwIAhIIL20vMDRsbGISCjIwMjMtMDEtMDkaGhIKMjAyMy0wMS0xM3IMCAISCC9tLzA0bGxicAKCAQ0I____________ARABQAFIAZgBAWBksgECIAE&tfu=GioaKAoSCeQQ-ei-AFNAEUr8luIrM2BAEhIJ3e98Y4X9MMARawfSOujnVMA&tcfs=UgRgAXgB"
    await page.goto(google_website, {
        waitUntil: 'domcontentloaded'
    })

    //accept 'cookies'
    const accept = await page.$('#yDmH0d > c-wiz > div > div > div > div.NIoIEf > div.G4njw > div.AIC7ge > div.CxJub > div.VtwTSb > form:nth-child(2) > div > div > button > span', node => node.textContent)
    await Promise.all([
        page.waitForNavigation(),
        accept.click()
    ]);
    //wait for results to be shown
    await page.waitForSelector('div.tsAU4e > div.Q70fcd > div.sPjWyb > div.MJg7fb.QB2Jof > span')
    
    let flights_array = []
    flights = await page.$$('body .tsAU4e')
    for (const flight of flights){
        let info = []
        let country = await flight.$eval('h3', node => node.textContent)
        let date = await flight.$eval('.xyc80b', node => node.textContent)
        date = date.replace('–', '-')
        let price = await flight.$eval('span', node => node.textContent)
        info.push(country, date, price.substr(1))
        flights_array.push(info)
    }

    //sort flights array by price
    flights_array.sort((a, b) => a[2] - b[2])

    await browser.close()

    return {
        statusCode: 200,
        body: JSON.stringify({
            status: "OK",
            flights_array
        })
    }
}
