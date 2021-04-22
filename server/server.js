const server = require('http').createServer()
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
    },
})

const PORT = 3001
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'

io.on('connection', (socket) => {
    // Join a conversation
    const { roomId } = socket.handshake.query
    socket.join(roomId)

    console.log('socket.handshake.query', socket.handshake.query)
    console.log('socket.handshake.query.roomId', socket.handshake.query.roomId)
    

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {

        console.log('NEW_CHAT_MESSAGE_EVENT', data)
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data)
    })

    // Leave the room if the user closes the socket
    socket.on('disconnect', () => {
        console.log('disconnect', socket.leave(roomId))
        socket.leave(roomId)
    })
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
