import express from 'express'
import bodyParser from 'body-parser'
import { route as bookmarkRoute }from './routes/bookmarks'
import { route as categoryRoute } from './routes/categories'
import { route as proxyRoute } from './routes/proxy'

const PORT = 3333

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use('/bookmarks', bookmarkRoute)
app.use('/categories', categoryRoute)
app.use('/proxy', proxyRoute)

app.use(express.json())

app.listen(PORT, () => {
    console.log(`SERVER ON | http://localhost:${PORT}`)
})