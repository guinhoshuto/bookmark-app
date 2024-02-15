import { Router, Request, Response } from 'express'
import Bookmarks from '../services/bookmarks'
export const route = Router()

const bookmarks = new Bookmarks() 

route.get('/', async (req: Request, res: Response) => {
    const allBookmarks = await bookmarks.getBookmarks()
    res.json(allBookmarks)
})

route.post('/create', async (req: Request, res: Response) => {
    const { url } = req.body
    bookmarks.createBookmark(url)
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e))

})

route.put('/:uuid', async (req: Request, res: Response) => {
    const { uuid } = req.params
    const { url, name, preview, rank, summary, categorieId } = req.body
    bookmarks.updateBookmark(uuid, url, name, preview, rank, summary, categorieId)
        .then(r => res.status(200).json({"message": `Bookmark ${uuid} atualizado com sucesso`}))
        .catch(e => res.status(500).json(e))
})

// export default route