import * as cheerio from 'cheerio'
import { newPage } from '../../lib/puppeteer'

export default class Twitter{
    url: string
    constructor(url: string){
        this.url = url
    }

    async getData(){
        const page = await newPage()
        await page.goto(this.url, {
            waitUntil: 'networkidle0'
        })
        const data = await page.evaluate(() => document.querySelector('*')?.outerHTML  )
        const $ = cheerio.load(data!)
        try{ 

        }catch(e){
            console.log(e)
        }
        
        console.log($('article a span').text())
        // const content = $('.content-block').text()
        // const author = $('div.sticky-header__user-details>div>span>a').text()
        // const title = $('h1.shot-header__title').text()
        // const thumbnail = $('img.v-img').attr("src")

        return {
            // name: `${title} by ${author}`,
            // summary: content,
            // preview: thumbnail
        }

    }
}