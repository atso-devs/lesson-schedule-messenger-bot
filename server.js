require('dotenv').config()
const app = require('express')(),
    bodyParser = require('body-parser'),
    PORT = process.env.PORT || 8080,
    serviceHandler = require('./src/serviceHandler'),
    catchError = require('./src/catchError')
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

app.listen(PORT, () => {
    console.log(`Server is available on http://localhost:${PORT}`)
})