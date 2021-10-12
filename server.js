const app = require('express')()
    PORT = process.env.PORT || 8080
;

app.post("/vk-confirmation", (req, res) => {
    console.log(req)
    res.send('035fae4c')
})

app.listen(PORT, () => {
    console.log(`Server is available on http://localhost:${PORT}`)
})