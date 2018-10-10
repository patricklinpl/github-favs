const express = require('express')
const path = require('path')
const app = express()

app.use('/shopify', express.static(path.join(__dirname, 'build')))

app.get('/shopify', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(9000)

console.log(path.join(__dirname, 'build'))
