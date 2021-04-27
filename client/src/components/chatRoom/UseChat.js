import { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'
import chatServiceClient from '../../services/chatServiceClient'
import { SERVER_URL } from '../../services/serviceConstants'

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage' // Name of the event

export const UseChat = (roomId) => {
    const [messages, setMessages] = useState([]) // Sent and received messages
    const socketRef = useRef()

    useEffect(() => {
        // Creates a WebSocket connection
        socketRef.current = socketIOClient(SERVER_URL, {
            query: { roomId },
        })

        // Listens for incoming messages
        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
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
    }, [roomId])

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

export const UseChatters = () => {
    const [usernames, setUsernames] = useState([])

    useEffect(() => {
        chatServiceClient
            .getAll()
            .then((chatters) => {
                setUsernames(chatters)
            })
            .catch((err) => {
                console.log('error with get request', err)
            })
    }, [])

    return usernames
}
