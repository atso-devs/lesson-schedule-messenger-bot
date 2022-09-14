require('dotenv').config()
const app = require('express')(),
    bodyParser = require('body-parser'),
    PORT = process.env.PORT || 8080,
    serviceHandler = require('./src/serviceHandler'),
    catchError = require('./src/catchError'),
    api = require('./src/api'),
    CommandError = require("./src/CommandError")
;
const cron = require("./src/cron");

app.use(bodyParser.json())

app.post('/', catchError(async (req, res, next) => {
    if (req.body.type === 'confirmation') {
        res.send(process.env.CONFIRMATION_STRING)
        return
    }
    if (req.body.object.message && req.body.object.message.text.startsWith('/')) {
        console.log('request', new Date().toTimeString())
        await serviceHandler(req.body)
    }
    res.sendStatus(200)
}))

app.post('/telegram', catchError(async (req, res, next) => {
    console.log('telegram bot')
}))

app.use(async (err, req, res, next) => {
    if (err instanceof CommandError) {
        console.log('errMsg send', new Date().toTimeString())
        await api.sendMessage(err.message, err.peerId)
        res.sendStatus(200)
    } else next(err)
})

app.listen(PORT, async () => {
    console.log(`Server is available on http://localhost:${PORT}`)
    await cron.start()
})