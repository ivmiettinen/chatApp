import { useState } from 'react'

import './ChatRoom.css'
import UseChat from './UseChat'
import InputComponent from '../elements/InputComponent'
import ButtonComponent from '../elements/ButtonComponent'

const ChatRoom = (props) => {
    console.log('ChatRoom Props', props)

    const { roomId } = props.match.params // Gets roomId from URL
    const {
        confirmUsername,
        handleConfirmUsername,
        handleUsernameChange,
        username,
        setConfirmUsername,
    } = props
    const { messages, sendMessage } = UseChat(roomId) // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = useState('') // Message to be sent

    const { usernames, sendUsername } = UseChat(roomId)
    // console.log('NameComponent', NameComponent)

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value)
    }

    const handleUsersWithLink = (e) => {
        console.log('username.length11', username.length)
        if (username === '') {
            alert('Enter username')
        } else if (username.length < 5) {
            alert('Username must be at least 5 long')
        } else {
            setConfirmUsername(true)
        }

        sendUsername(username, `user ${username} joins the chat`)
        // e.preventDefault()
    }

    const handleSendMessage = (e) => {
        console.log('handleSendMessage', e)

        console.log('username.length', username.length)
        if (username === '') {
            alert('Enter username')
            return
        } else if (username.length < 5) {
            alert('Username must be at least 5 long')
            return
        } else {
            setConfirmUsername(true)
        }

        sendMessage(username, newMessage)

        setNewMessage('')
    }

    return (
        <>
            {username === '' || confirmUsername === false ? (
                <div className='chat-lounge-container'>
                    <p>
                        Please enter your username before entering the room{' '}
                        <strong>{roomId}</strong>
                    </p>

                    <InputComponent
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder='Name'
                        className='text-input-field'
                        type='text'
                    />

                    <ButtonComponent
                        className='enter-room-button'
                        value={username}
                        onClick={handleUsersWithLink}
                    >
                        Enter
                    </ButtonComponent>
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
            )}{' '}
        </>
    )
}

export default ChatRoom