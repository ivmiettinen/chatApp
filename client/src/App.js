import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './index.css'
import Home from './components/home/Home'
import ChatRoomLobby from './components/chatRoom/ChatRoomLobby'
import { UseChatters } from './services/chatHelperFunctions'
import ErrorModal from './components/UI/ErrorModal'
import chatServiceClient from './services/chatServiceClient'
import Header from './components/layout/Header'

function App() {
    const [username, setUsername] = useState('')
    const [confirmUsername, setConfirmUsername] = useState(false)
    const [roomName, setRoomName] = useState('')
    const [error, setError] = useState(null)

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value)
    }

    const handleRoomNameChangeWithLink = (e) => {
        setRoomName(e)
    }

    const chatters = UseChatters(username)

    const onlyUniqueUsernames = chatters
        .map((p) => p.username)
        .find((findName) => findName === username)

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

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
        } else if (roomName.trim().length < 1) {
            setError({
                title: 'Invalid input',
                message: 'Room name must be at least 1 character long',
            })
        } else {
            const personObject = {
                username: username,
            }

            chatServiceClient
                .create(personObject)
                .then((res) => {
                    setUsername(res.person.username)
                    setConfirmUsername(true)
                })

                .catch((err) => {
                    console.log('error with get request', err)
                    setError({
                        title: 'Invalid input',
                        message: `Username '${username}' is already in use.`,
                    })
                    setConfirmUsername(false)
                })
        }
    }

    const errorHandler = () => {
        setError(null)
    }

    return (
        <>
            {!confirmUsername && <Header />}
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
                                handleRoomNameChangeWithLink={
                                    handleRoomNameChangeWithLink
                                }
                            />
                        )}
                    />
                </Switch>
            </Router>
        </>
    )
}

export default App
