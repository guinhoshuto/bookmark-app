import { Router, Request, Response } from 'express'
import { createBookmark } from '../services/bookmarks'
export const route = Router()

route.get('/', (req: Request, res: Response) => {
    res.json({message: 'teste'})
})

route.post('/create', async (req: Request, res: Response) => {
    const { url, name } = req.body
    await createBookmark(url, name)
})

// export default route