const express = require('express')
const app = express()
const port = 3000

app.listen(port,() => {
    console.log(`App listening at port ${port}`)
})

app.get('/',(req,res) => {
    res.send("<h1>App started sucessfully</h1>")
})