import * as cheerio from 'cheerio'

export default class Twitter{
    url: string
    constructor(url: string){
        this.url = url
    }

    async getData(){
        console.log('aqui entra o twitter')
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