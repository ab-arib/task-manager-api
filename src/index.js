const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT


// middleware for blocked certain http request method
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET request is disabled!')
//     } else {
//         next()
//     }
// })

// middleware for maintance mode
// app.use((req, res, next) => {
//     res.status(503).send('This site is under maintenance, please come back later!')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})