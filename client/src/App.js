import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './index.css'
import Home from './Home/Home'
import ChatRoom from './ChatRoom/ChatRoom'

function App() {
    const [username, setUsername] = useState('')
    const [confirmUsername, setConfirmUsername] = useState(false)

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handleConfirmUsername = (e) => {
      setConfirmUsername(true)
    }

    

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
                        <ChatRoom {...props} username={username} handleUsernameChange={handleUsernameChange} confirmUsername={confirmUsername} handleConfirmUsername={handleConfirmUsername} />
                    )}
                />
            </Switch>
        </Router>
    )
}

export default App
