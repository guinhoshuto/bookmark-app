import { prisma } from "../lib/prisma";
import puppeteer from 'puppeteer'

export default class Bookmarks{
    async createBookmark(url:string){
        const name = await this.getUrlData(url)
        try{
            const newBookmark = await prisma.bookmark.create({
                data: {
                    url,
                    name,
                    categoryId: 1,
                    preview: "",
                    rank: 1,
                    summary: "" 
                }
            })
            return newBookmark
        } catch(e){
            console.log(e)
        }
    }

    async getBookmarks(){
        const bookmarks = await prisma.bookmark.findMany()
        return bookmarks
    }

    async getUrlData(url: string){
        try{
            const browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            }) 
            const page = await browser.newPage()
            await page.goto(url, {
                waitUntil: "domcontentloaded"
            })
            
            const title = await page.title()
            console.log(title)
            return title
        } catch(e) {
            console.log(e)
            return ''
        }
    }

    async updateBookmark(uuid: string, url: string, name: string, preview: string, rank: number, summary: string, categoryId: number){
        const bookmark = await prisma.bookmark.update({
            where: {
                id: uuid
            },
            data: {
                url,
                name,
                preview,
                rank,
                summary,
                categoryId
            }
        })
    }
}