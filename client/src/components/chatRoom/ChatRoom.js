import { useState } from 'react'
import './ChatRoom.css'
import ChatIcon from '@material-ui/icons/Chat'
import { UseChat } from './UseChat'
import ButtonComponent from '../UI/ButtonComponent'

const ChatRoom = ({ roomId, username }) => {
    const [newMessage, setNewMessage] = useState('') // Message to be sent

    const { messages, sendMessage } = UseChat(roomId, username)

    // Creates a websocket and manages messaging

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value)
    }

    const handleSendMessage = () => {
        sendMessage(username, newMessage)
        setNewMessage('')
    }

    return (
        <>
            <div className='chat-room-container'>
                <div className='chatroomHeader'>
                    <h1 className='room-name'>Room: {roomId}</h1>
                    <div className='chatIconDiv1'></div>

                    <div className='chatLogoDiv'>
                        <span>
                            <ChatIcon style={{ fontSize: 40 }}></ChatIcon>
                        </span>
                        chatApp
                    </div>
                </div>

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
                                {message.disconnect ? (
                                    <p className='leave-chatroom'>
                                        <strong>{message.disconnect} </strong>
                                        left the chat room
                                    </p>
                                ) : message.connected ? (
                                    <p className='connect-chatroom'>
                                        <strong>{message.connected} </strong>
                                        connected to the chat room
                                    </p>
                                ) : (
                                    <>
                                        <strong
                                            style={{
                                                color: `${message.color}`,
                                            }}
                                        >
                                            {message.username}:{' '}
                                        </strong>
                                        <p>{message.body}</p>
                                    </>
                                )}
                                <p className='time-chatroom'>{message.time}</p>
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
