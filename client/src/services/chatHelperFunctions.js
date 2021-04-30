import { useState, useEffect } from 'react'
import chatServiceClient from './chatServiceClient'

export const UseChatters = (username) => {
    // console.log('props', username)
    const [usernames, setUsernames] = useState([])

    useEffect(() => {
        const getUsernames = setTimeout(() => {
            console.log('effectiii')
            chatServiceClient
                .getAll()
                .then((chatters) => {
                    setUsernames(chatters)
                })
                .catch((err) => {
                    console.log('error with get request', err)
                })
        }, 1000)

        return () => {
            console.log('2clean up the timeout')
            clearTimeout(getUsernames)
        }
    }, [username])

    return usernames
}
