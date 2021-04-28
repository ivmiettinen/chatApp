import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './index.css'
import Home from './components/home/Home'
import ChatRoomLobby from './components/chatRoom/ChatRoomLobby'
import {UseChatters} from './services/chatHelperFunctions'

function App() {
    const [username, setUsername] = useState('')
    const [confirmUsername, setConfirmUsername] = useState(false)

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handleConfirmUsername = (e) => {
        setConfirmUsername(true)
    }

    const chatters = UseChatters()

    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    {' '}
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
    )
}

export default App
