import { useHistory } from 'react-router-dom'
import InputComponent from '../UI/InputComponent'
import ButtonComponent from '../UI/ButtonComponent'

import './Home.css'

const Home = (props) => {
    let history = useHistory()

    const addNewChatter = (e) => {
        e.preventDefault()

        props.handleConfirmUsername()
    }

    if (props.confirmUsername) {
        history.push(`/${props.roomName}`)
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
                value={props.roomName}
                onChange={props.handleRoomNameChange}
                placeholder='Room'
                className='text-input-field'
            />
            <ButtonComponent
                to={`/${props.roomName}`}
                className='enter-room-button'
                onClick={addNewChatter}
            >
                Go
            </ButtonComponent>
        </div>
    )
}

export default Home
