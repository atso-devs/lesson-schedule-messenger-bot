const app = require('express')()
    PORT = process.env.PORT || 8080
;

app.post("/vk-confirmation", (req, res) => {
    console.log(req)
    res.send('110fab09')
})

app.listen(PORT, () => {
    console.log(`Server is available on http://localhost:${PORT}`)
})