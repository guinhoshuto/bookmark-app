import express, { Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser'
import { route as bookmarkRoute }from './routes/bookmarks'
import { route as categoryRoute } from './routes/categories'
import { route as proxyRoute } from './routes/proxy'

const PORT = 3333

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', "true");
    next();
  });
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(express.json())
app.use('/bookmarks', bookmarkRoute)
app.use('/categories', categoryRoute)
app.use('/proxy', proxyRoute)


app.listen(PORT, () => {
    console.log(`SERVER ON | http://localhost:${PORT}`)
})