import * as cheerio from 'cheerio'

export default class Dribbble{
    url: string
    constructor(url: string){
        this.url = url
    }

    async getData(){
        const res = await fetch(this.url)
        const html = await res.text()
        const $ = cheerio.load(html)

        const content = $('.content-block').text()
        const author = $('div.sticky-header__user-details>div>span>a').text()
        const title = $('h1.shot-header__title').text()
        const thumbnail = $('img.v-img').attr("src")

        return {
            name: `${title} by ${author}`,
            summary: content,
            preview: thumbnail
        }

    }
}