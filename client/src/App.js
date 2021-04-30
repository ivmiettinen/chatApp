import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './index.css'
import Home from './components/home/Home'
import ChatRoomLobby from './components/chatRoom/ChatRoomLobby'
import { UseChatters } from './services/chatHelperFunctions'
import ErrorModal from './components/UI/ErrorModal'

function App() {
    const [username, setUsername] = useState('')
    const [confirmUsername, setConfirmUsername] = useState(false)
    const [roomName, setRoomName] = useState('')
    const [error, setError] = useState()

    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value)
    }

    const chatters = UseChatters(confirmUsername)

    const onlyUniqueUsernames = chatters
        .map((p) => p.username)
        .find((findName) => findName === username)

    const handleUsernameChange = (e) => {
        // console.log('handleUsernameChange', e.target.value)
        setUsername(e.target.value)
    }

    //
        
    //

    const handleConfirmUsername = (e) => {
        if (username.trim().length < 1) {
            setError({
                title: 'Invalid input',
                message: 'Username must be at least 1 characters long.',
            })
            return
        } else if (onlyUniqueUsernames) {
            setError({
                title: 'Invalid input',
                message: `Username '${username}' is already in use.`,
            })
            return
        } 
        else if (roomName.trim().length < 1) {
            // console.log('props.roomName.trim().length', roomName.trim().length)
            setError({
                title: 'Invalid input',
                message: 'Room name must be at least 1 character long',
            })
        } 
        else {
            setConfirmUsername(true)
        }
    }

    const errorHandler = () => {
        setError(null)
    }

    return (
        <div>
            {error && (
                <ErrorModal
                    title={error.title}
                    message={error.message}
                    onConfirm={errorHandler}
                />
            )}
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <Home
                            username={username}
                            handleUsernameChange={handleUsernameChange}
                            confirmUsername={confirmUsername}
                            setConfirmUsername={setConfirmUsername}
                            handleConfirmUsername={handleConfirmUsername}
                            onlyUniqueUsernames={onlyUniqueUsernames}
                            handleRoomNameChange={handleRoomNameChange}
                            roomName={roomName}
                        />
                    </Route>
                    <Route
                        exact
                        path='/:roomId'
                        render={(props) => (
                            <ChatRoomLobby
                                {...props}
                                username={username}
                                handleUsernameChange={handleUsernameChange}
                                confirmUsername={confirmUsername}
                                handleConfirmUsername={handleConfirmUsername}
                                chatters={chatters}
                                handleRoomNameChange={handleRoomNameChange}
                            />
                        )}
                    />
                </Switch>
            </Router>
        </div>
    )
}

export default App
