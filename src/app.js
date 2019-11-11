const express = require('express')
const app = express()
const port = 3000

app.use('/books', require('./api/books'))
app.use('/authors', require('./api/authors'))

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
