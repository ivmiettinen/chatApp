import React from 'react'
import InputComponent from '../UI/InputComponent'
import ButtonComponent from '../UI/ButtonComponent'
import ChatRoom from './ChatRoom'

const ChatRoomLobby = (props) => {
    // console.log('ChatRoomLobby', props)

    const { roomId } = props.match.params
    const {
        confirmUsername,
        handleConfirmUsername,
        handleUsernameChange,
        username,
        handleRoomNameChange
    } = props

    const handleUrlConfirmUsername = (roomId) => {
        handleRoomNameChange(roomId)
        handleConfirmUsername()
    }

    return (
        <>
            {confirmUsername === false ? (
                <div className='chat-lobby-container'>
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
                        value={roomId}
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
