import { prisma } from "../lib/prisma";

export async function createBookmark(url:string, name: string){
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
    console.log(newBookmark)
}