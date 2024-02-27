import * as cheerio from 'cheerio'	
import ogs from 'open-graph-scraper'
import { OpenGraphScraperOptions, CustomMetaTags } from 'open-graph-scraper/dist/lib/types'

export default class OpenGraphScraper {
    url: string
    params: string[]
    metaTags?: string[]

    constructor(url: string, params: string[], metaTags?: string[]) {
        this.url = url
        this.params = params
        this.metaTags = metaTags || undefined
    }

    options(){
        let metaTags: CustomMetaTags[] = []
        if(this.metaTags){
            metaTags = this.metaTags.map(tag => {
                return {
                    multiple: false,
                    property: tag,
                    fieldName: tag
                }
            })
        }

        return {
            url: this.url,
            // params: this.params,
            customMetaTags: metaTags
        }
    }

    async getData() {
        console.log(this.options())
        const { error, result, html } = await ogs(this.options())
        console.log('ogs', result)
        const $ = cheerio.load(html!)
        console.log($('meta').text())	
        return { result }
    }
    
}