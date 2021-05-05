import { useState } from 'react'

import './ChatRoom.css'
import { UseChat } from './UseChat'
import ButtonComponent from '../UI/ButtonComponent'

const ChatRoom = ({ roomId, username, confirmUsername }) => {
    const [newMessage, setNewMessage] = useState('') // Message to be sent

    const { messages, sendMessage } = UseChat(roomId, username, confirmUsername)

    // Creates a websocket and manages messaging

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value)
    }

    const handleSendMessage = () => {
        sendMessage(username, newMessage)
        setNewMessage('')
    }

    console.log('messages', messages)

    return (
        <>
            <div className='chat-room-container'>
                <h1 className='room-name'>Room: {roomId}</h1>
                <div className='messages-container'>
                    <ol className='messages-list'>
                        {messages.map((message, i) => (
                            <li
                                key={i}
                                className={`message-item ${
                                    message.ownedByCurrentUser
                                        ? 'my-message'
                                        : 'received-message'
                                }`}
                                style={{
                                    backgroundColor: `${message.color}`,
                                }}
                            >
                                <strong>{message.username}:</strong>{' '}
                                {message.body}
                            </li>
                        ))}
                    </ol>
                </div>
                <textarea
                    value={newMessage}
                    onChange={handleNewMessageChange}
                    placeholder='Write message...'
                    className='new-message-input-field'
                />
                <ButtonComponent
                    onClick={handleSendMessage}
                    className='send-message-button'
                >
                    Send
                </ButtonComponent>
            </div>
        </>
    )
}

export default ChatRoom
