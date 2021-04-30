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
    const [error, setError] = useState()

    const handleUsernameChange = (e) => {
        console.log('handleUsernameChange', e.target.value)
        setUsername(e.target.value)
    }

    const handleConfirmUsername = (e) => {
        if (username.trim().length < 6) {
            setError({
                title: 'Invalid input',
                message: 'Username must be at least 6 characters long.',
            })
            return
        } else {
            setConfirmUsername(true)
        }
        // if (username.trim().length < 6) {
        //     alert('Username must be at least 6 characters long')
        //     return
        // } else {
        //     setConfirmUsername(true)
        // }
    }

    const chatters = UseChatters()

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
                            />
                        )}
                    />
                </Switch>
            </Router>
        </div>
    )
}

export default App
