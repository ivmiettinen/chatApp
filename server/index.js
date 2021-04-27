const express = require('express')
const app = express()

const http = require('http')

const cors = require('cors')

const usersRouter = require('./controllers/users')

const chatterArray = require('./chatterArray')


app.use(cors())

const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
    },
})

const PORT = 3001
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'





const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

io.on('connection', (socket) => {
    // Join a conversation
    const { roomId } = socket.handshake.query
    socket.join(roomId)

    console.log('client id - ' + socket.id)

    console.log('getRandomColor', getRandomColor())

    const newChatter = {
        id: socket.id,
        color: getRandomColor(),
    }

    chatterArray.push(newChatter)

    console.log('chatterArray when after push', chatterArray)

    // console.log('socket.handshake.query', socket.handshake.query)
    console.log('socket.handshake.query.roomId', socket.handshake.query.roomId)

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        console.log('NEW_CHAT_MESSAGE_EVENT', data)

        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data)
    })

    // Leave the room if the user closes the socket
    socket.on('disconnect', () => {
        console.log('disconnect', roomId)

        const findId = (element) => element.id === socket.id

        const actualIndex = chatterArray.findIndex(findId)

        chatterArray.splice(actualIndex, 1)

        console.log('chatterArray when disconnecting', chatterArray)

        socket.leave(roomId)
    })
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


app.use('/api/users', usersRouter)

module.exports = app