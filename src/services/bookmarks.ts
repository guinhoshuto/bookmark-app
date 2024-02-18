import { prisma } from "../lib/prisma";
import puppeteer from 'puppeteer'
import Scrapper from "./scrapper/scrapper";

const scrapper = new Scrapper()

export default class Bookmarks{
    async createBookmark(url:string, name: string){
        const {title, thumbnail, content} = await scrapper.handleUrl(url)
        try{
            const newBookmark = await prisma.bookmark.create({
                data: {
                    url,
                    name: title,
                    categoryId: 1,
                    preview: thumbnail ? thumbnail : "",
                    rank: 1,
                    summary: content ? content : ""
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

    async findByUrl(url: string){
        const bookmark = await prisma.bookmark.findUnique({
            where: {
                url: url
            },
        })
        return bookmark
    }

    //findbydomain pode ser legal

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
                categoryId,
                updated_at: new Date()
            }
        })
    }
}