import { prisma } from "../lib/prisma";

export default class Bookmarks{
    async createBookmark(url:string, name: string){
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
    }

    async getBookmarks(){
        const bookmarks = await prisma.bookmark.findMany()
        return bookmarks
    }
}