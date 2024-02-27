import { newPage } from "../../lib/puppeteer"
import Dribbble from "./dribbble"
import Instagram from "./instagram"
import Twitter from "./twitter"

interface Data {
    title: string
    thumbnail?: string
    content?: string
}

export default class Scrapper{
    async getUrlData(url: string){
        const data = await this.handleUrl(url)
        return data
    }

    async handleUrl(url: string){
        let data: Data
        const domain = this.getDomain(url)
        switch(domain) {
            case "dribbble.com":
                const dribbble = new Dribbble(url)
                const  {name, preview, summary} = await dribbble.getData()
                data = {title: name, thumbnail: preview, content: summary}
                break;
            case "twitter.com":
                const twitter = new Twitter(url)
                const y = await twitter.getData()

                data = {title: ''}
                break;
            case "x.com":
                const x = new Twitter(url)
                data = {title: ''}
                break;
            case "instagram.com":
                const instagram = new Instagram(url)
                const instagramData = await instagram.getData()
                data = {title: instagramData.name, thumbnail: instagramData.preview, content: instagramData.summary}
                break;
            default: 
                data = await this.genericScrapper(url)
        }
        return data
    }

    async genericScrapper(url: string){
        let data: Data
        try{
            const page = await newPage()        
            await page.goto(url, {
                waitUntil: 'domcontentloaded'
            })
            console.log('[LOG]', 'url carregada')
            const title = await page.title()
            console.log(title)
            return {
                title: title,
                thumbnail: '',
                content: '' 
            }
        } catch(e) {
            console.log(e)
            throw Error("[ERROR] erro no scrapper genérico")
        }
    }

    getDomain(url: string){
        let domain = (new URL(url))
        return domain.hostname.replace("www.", "")
    }
}
