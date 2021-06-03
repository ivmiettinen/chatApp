import React, { useEffect } from 'react'
import InputComponent from '../UI/InputComponent'
import ButtonComponent from '../UI/ButtonComponent'
import ChatRoom from './ChatRoom'
import './ChatRoomLobby.css'

const ChatRoomLobby = (props) => {
    const { roomId } = props.match.params
    const {
        confirmUsername,
        handleConfirmUsername,
        handleUsernameChange,
        username,
        handleRoomNameChangeWithLink,
    } = props
    

    const handleUrlConfirmUsername = () => {
        handleConfirmUsername()
    }

    useEffect(() => {
        handleRoomNameChangeWithLink(roomId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {confirmUsername === false ? (
                <div className='chat-lobby-container'>
                    <p className='text-input-field'>
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
                        onClick={handleUrlConfirmUsername}
                    >
                        Enter
                    </ButtonComponent>
                </div>
            ) : (
                <ChatRoom roomId={roomId} username={username} />
            )}
        </>
    )
}

export default ChatRoomLobby
