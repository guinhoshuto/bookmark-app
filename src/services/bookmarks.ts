import { prisma } from "../lib/prisma";
import puppeteer from 'puppeteer'

export default class Bookmarks{
    async createBookmark(url:string, name: string){
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