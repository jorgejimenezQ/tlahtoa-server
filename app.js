import { createServer } from 'http'
import { Server } from 'socket.io'
import express from 'express'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()

app.use('/', authMiddleware, (req, res) => {
    res.send('Hello World')
})

const PORT = process.env.PORT || 3000
const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

export default app
