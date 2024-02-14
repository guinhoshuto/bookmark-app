import { Router, Request, Response } from "express";
import Categories from "../services/categories";
export const route = Router()

const categories = new Categories()

route.get('/', async (req: Request, res: Response) => {
    const allCategories = await categories.getCategories()
    res.status(200).json(allCategories)
})

route.post('/create', async (req: Request, res: Response) => {
    const { name } = req.body
    categories.createCategory(name)
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e))
})

