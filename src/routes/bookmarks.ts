import { Router, Request, Response } from 'express'
import Bookmarks from '../services/bookmarks'
export const route = Router()

const bookmarks = new Bookmarks() 

route.get('/', async (req: Request, res: Response) => {
    const allBookmarks = await bookmarks.getBookmarks()
    res.json(allBookmarks)
})

route.post('/create', async (req: Request, res: Response) => {
    const { url, name } = req.body
    bookmarks.createBookmark(url, name)
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e))

})

// export default route