import puppeteer from "puppeteer"

export async function newPage(){
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }) 
    const page = await browser.newPage()
    return page
}