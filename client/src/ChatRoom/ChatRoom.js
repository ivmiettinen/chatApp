import { useState } from 'react'

import './ChatRoom.css'
import UseChat from './UseChat'
import InputComponent from '../Home/InputComponent'

const ChatRoom = (props) => {
    const { roomId } = props.match.params // Gets roomId from URL
    const { confirmUsername, handleConfirmUsername, handleUsernameChange, username} = props;
    const { messages, sendMessage } = UseChat(roomId, username, confirmUsername) // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = useState('') // Message to be sent

    // console.log('NameComponent', NameComponent)

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value)
    }

    const handleSendMessage = () => {
        sendMessage(username, newMessage)
        setNewMessage('')
    }

    return (
        <>
            {username === '' || confirmUsername === false ? (
                <div>
                  <p>Please enter your username before entering the room <strong>{roomId}</strong></p>    
                    <div>
                        <InputComponent
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder='Name'
                        />
                    </div>
                    <button onClick={handleConfirmUsername}>Enter</button>
                </div>
            ) : (
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
                                >
                                   <strong>{props.username}:</strong> {message.body}
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
                    <button
                        onClick={handleSendMessage}
                        className='send-message-button'
                    >
                        Send
                    </button>
                </div>
            )}{' '}
        </>
    )
}

export default ChatRoom
