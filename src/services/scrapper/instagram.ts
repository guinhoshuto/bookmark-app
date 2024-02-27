import Iframely from "../../lib/iframely"

export default class Instagram {
    url: string
    constructor(url: string){
        this.url = url
    }

    async getData(){
        const iframely = new Iframely(this.url)
        const { links, meta } = await iframely.getData()
        console.log(links, meta)
        //tratar caso não venha thumbnail
        return {
            name: meta.title,
            summary: meta.title,
            preview: links.thumbnail[0].href
        }
    }
}