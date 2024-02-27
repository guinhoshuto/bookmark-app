import { Router, Request, Response } from 'express'
import Bookmarks from '../services/bookmarks'
import Scrapper from '../services/scrapper/scrapper'
import { uploadFile } from '../services/thumbnail'
export const route = Router()

const bookmarks = new Bookmarks() 

route.get('/', async (req: Request, res: Response) => {
    const allBookmarks = await bookmarks.getBookmarks()
    res.json(allBookmarks)
})

route.post('/create', async (req: Request, res: Response) => {
    const { url } = req.body
    //dar um jeito de ser opcional o update ou não 
    const urlAlredyExist = await bookmarks.findByUrl(url)

    const scrapper = new Scrapper()
    let { title, thumbnail, content } = await scrapper.getUrlData(url)
    console.log(thumbnail)
    if(thumbnail){
        thumbnail = await uploadFile(thumbnail)
    }

    //quando tudo estiver certo, remover esse ternário escroto
    if(urlAlredyExist){
        bookmarks.updateBookmark(
            urlAlredyExist.id, 
            url, 
            title, 
            thumbnail ? thumbnail : "", 
            1, 
            content ? content : "", 
            1
        )

    } else {
        bookmarks.createBookmark(url, title)
            .then(r => res.status(200).json(r))
            .catch(e => res.status(500).json(e))
    }

})

route.put('/:uuid', async (req: Request, res: Response) => {
    const { uuid } = req.params
    const { url, name, preview, rank, summary, categorieId } = req.body
    bookmarks.updateBookmark(uuid, url, name, preview, rank, summary, categorieId)
        .then(r => res.status(200).json({"message": `Bookmark ${uuid} atualizado com sucesso`}))
        .catch(e => res.status(500).json(e))
})

// export default route