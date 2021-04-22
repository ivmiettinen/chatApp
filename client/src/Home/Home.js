import { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import InputComponent from './InputComponent'

import './Home.css'

const Home = (props) => {
    const [roomName, setRoomName] = useState('')

    // const handleUsernameChange = (event) => {
    //     setUsername(event.target.value)
    // }

    let history = useHistory()

    const addNewChatter = (e) => {
        console.log('e', e)
        console.log('e.target.value', e.target.value)

        e.preventDefault()
        if (roomName === '') {
            alert('Enter room name')
            return
        } else if (props.username === '') {
            alert('Enter username ')
        } else {
            setRoomName(e.target.value)
            props.handleConfirmUsername(true)
            // setUsername(e.target.value)
        }
        history.push(`/${roomName}`)
    }

    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value)
    }

    return (
        <div className='home-container'>
            <label>
                <InputComponent
                    value={props.username}
                    onChange={props.handleUsernameChange}
                    placeholder='Name'
                />
            </label>
            <label>
                <input
                    type='text'
                    placeholder='Room'
                    value={roomName}
                    onChange={handleRoomNameChange}
                    className='text-input-field'
                />
            </label>

            <button
                to={`/${roomName}`}
                className='enter-room-button'
                onClick={addNewChatter}
            >
                Go
            </button>
        </div>
    )
}

export default Home
