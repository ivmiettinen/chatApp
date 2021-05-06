import { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'
import { SERVER_URL } from '../../services/serviceConstants'

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage' // Name of the event

// const USER_DISCONNECT_MESSAGE = 'userDisconnectMessage'

export const UseChat = (roomId, username) => {
    const [messages, setMessages] = useState([]) // Sent and received messages
    // const [userDisconnect, setUserDisconnect] = useState([])
    const socketRef = useRef()

    useEffect(() => {
        // Creates a WebSocket connection
        socketRef.current = socketIOClient(SERVER_URL, {
            query: { roomId, username: username },
        })

        // Listens for incoming messages
        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            console.log('NEW_CHAT_MESSAGE_EVENT', message)
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            }
            setMessages((messages) => [...messages, incomingMessage])
        })

        // Destroys the socket reference
        // when the connection is closed
        return () => {
            socketRef.current.disconnect()
        }
    }, [roomId, username])

    // Sends a message to the server that
    // forwards it to all users in the same room
    const sendMessage = (username, messageBody) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            username: username,
            body: messageBody,
            senderId: socketRef.current.id,
        })
    }

    return { messages, sendMessage }
}
