import { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage' // Name of the event
const NEW_USERNAME = 'newUsername'
const SOCKET_SERVER_URL = 'http://localhost:3001'

const UseChat = (roomId) => {
    const [messages, setMessages] = useState([]) // Sent and received messages
    const [usernames, setUsernames] = useState([])
    const socketRef = useRef()

    useEffect(() => {
        // Creates a WebSocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId },
        })

        // console.log('Effect')

        // Listens for incoming messages
        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            
            
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            }
            setMessages((messages) => [...messages, incomingMessage])
        })

        //Get usernames from backend:
        socketRef.current.on('getChatterNames', (users) => {
            console.log(users)
            setUsernames(users)
        })

        // Destroys the socket reference
        // when the connection is closed
        return () => {
            socketRef.current.disconnect()
        }
    }, [roomId])


    const sendUsername = (username, messageBody) => {
        console.log('sendUsername', username)

        socketRef.current.emit(NEW_USERNAME, {
            
            username: username,
            body: messageBody,
            senderId: socketRef.current.id,
        })
    }
    // Sends a message to the server that
    // forwards it to all users in the same room
    const sendMessage = (username, messageBody) => {
        console.log('sendMessage', username)

        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            
            username: username,
            body: messageBody,
            senderId: socketRef.current.id,
        })
    }

    return { messages, usernames, sendUsername, sendMessage }
}

export default UseChat
