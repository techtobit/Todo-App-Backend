const express = require('express')
const app = express()
const port = process.env.PORT || 5000;


app.get('/todo-app', (req, res) => {
 res.send('Ok')
})



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))