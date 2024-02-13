import { prisma } from "../lib/prisma";

export async function createCategory(name: string) {
    await prisma.category.create({
        data: {
            name
        }
    })
}