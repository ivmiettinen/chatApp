const express = require('express')
const app = express()

app.use(express.json())



////////

const http = require('http')

const cors = require('cors')

const usersRouter = require('./controllers/users')

const chatterArray = require('./chatterArray')

const randomColor = require('randomcolor')

app.use(cors())

const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
    },
})

const PORT = 3001
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'

io.on('connection', (socket) => {



console.log('socket.handshake.query', socket.handshake.query)
    // Join a conversation
    const { roomId, username } = socket.handshake.query
    socket.join(roomId)


    

    //find chatter with id:
    const findId = (element) => element.id === socket.id
    

    const newChatter = {
        id: socket.id,
        color: randomColor(),
        username: username,
    }

    chatterArray.push(newChatter)

    //Emit 'New user connected' message to chat room everyone expect sender
    socket.to(roomId).emit(NEW_CHAT_MESSAGE_EVENT, {
        connected: chatterArray.find(findId).username,
    })

    console.log('chatterArray after connection & push', chatterArray)

    // Listen for new messages

    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        console.log('NEW_CHAT_MESSAGE_EVENT', data)

        const oneId = chatterArray.find(findId)

        Object.assign(data, { color: oneId.color })

        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data)
    })

    // Leave the room if the user closes the socket
    socket.on('disconnect', () => {
        console.log('disconnect', roomId)

        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, {
            disconnect: chatterArray.find(findId).username,
        })

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
