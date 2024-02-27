import dotenv from 'dotenv'
dotenv.config()

export default class Iframely{
    url: string

    constructor(url: string){
        this.url = url
    }

    async getData(){
        const res = await fetch(`https://iframe.ly/api/iframely?url=${this.url}&api_key=${process.env.IFRAMELY_API_KEY}`)
        const { links, meta } = await res.json()

        return {links, meta}
    }
}