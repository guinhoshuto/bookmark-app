import express, { Request, Response, NextFunction} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { route as bookmarkRoute }from './routes/bookmarks'
import { route as categoryRoute } from './routes/categories'
import { route as proxyRoute } from './routes/proxy'

const PORT = 3333

const app = express()

const allowCrossDomain = (req: Request, res:Response, next: NextFunction) => {
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
  };

app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(allowCrossDomain)
app.use(express.json())
app.use('/bookmarks', bookmarkRoute)
app.use('/categories', categoryRoute)
app.use('/proxy', proxyRoute)


app.listen(PORT, () => {
    console.log(`SERVER ON | http://localhost:${PORT}`)
})