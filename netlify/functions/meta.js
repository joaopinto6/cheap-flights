const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

exports.handler = async function(event, context) {
    
    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: process.env.CHROME_EXEC_PATH || await chromium.executablePath,
        headless: true
    })


    await browser.close()

    return {
        statusCode: 200,
        body: JSON.stringify({
            status: 'ok'
        })
    }
}