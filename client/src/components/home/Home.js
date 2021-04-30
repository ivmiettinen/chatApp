import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import InputComponent from '../UI/InputComponent'
import ButtonComponent from '../UI/ButtonComponent'

import './Home.css'

const Home = (props) => {
    const [roomName, setRoomName] = useState('')

    let history = useHistory()

    const addNewChatter = (e) => {
        e.preventDefault()

        props.handleConfirmUsername()
    }

    if (props.confirmUsername) {
        history.push(`/${roomName}`)
    }

    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value)
    }

    return (
        <div className='home-container'>
            <InputComponent
                type='text'
                value={props.username}
                onChange={props.handleUsernameChange}
                placeholder='Name'
                className='text-input-field'
            />
            <InputComponent
                type='text'
                value={roomName}
                onChange={handleRoomNameChange}
                placeholder='Room'
                className='text-input-field'
            />
            <ButtonComponent
                to={`/${roomName}`}
                className='enter-room-button'
                onClick={addNewChatter}
            >
                Go
            </ButtonComponent>
        </div>
    )
}

export default Home
