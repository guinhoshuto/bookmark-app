import { prisma } from "../lib/prisma";

export default class Categories{
    constructor(){}

    async createCategory(name: string){
        await prisma.category.create({
            data: {
                name
            }
        })
    }

    async getCategories(){
        const categories = await prisma.category.findMany()
        return categories
    }
}
// export async function createCategory(name: string) {
// }
