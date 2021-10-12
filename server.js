const app = require('express')()
// TODO move PORT to .env
    PORT = 3000
;

app.post("/vk-confirmation", (req, res) => {
    console.log(req)
    res.send('110fab09')
})

app.listen(PORT, () => {
    console.log(`Server is available on http://localhost:${PORT}`)
})