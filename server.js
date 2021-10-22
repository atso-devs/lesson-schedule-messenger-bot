require('dotenv').config()
const app = require('express')(),
    bodyParser = require('body-parser'),
    PORT = process.env.PORT || 8080,
    serviceHandler = require('./src/serviceHandler'),
    catchError = require('./src/catchError'),
    api = require('./src/api'),
    CommandError = require("./src/CommandError")
;

app.use(bodyParser.json())

app.post('/', catchError(async (req, res, next) => {
    if (!req.body.object.message) {
        return
    }
    if (!req.body.object.message.text.startsWith('/')) {
        return
    }
    const result = await serviceHandler(req.body)
    if (req.body.type === 'confirmation') {
        res.send(result)
    } else {
        res.sendStatus(200)
    }
}))

app.use(async (err, req, res, next) => {
    if (err instanceof CommandError) {
        await api.sendMessage(err.message, err.peerId)
        res.sendStatus(400)
    } else next(err)
})

app.listen(PORT, async () => {
    console.log(`Server is available on http://localhost:${PORT}`)
})