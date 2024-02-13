import { Router, Request, Response } from "express";
import { createCategory } from "../services/categories";
export const route = Router()

route.post('/create', async (req: Request, res: Response) => {
    const { name } = req.body
    await createCategory(name)
})

