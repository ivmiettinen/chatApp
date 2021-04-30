import { useState, useEffect } from 'react'
import chatServiceClient from './chatServiceClient'

export const UseChatters = (newUsername) => {
    // console.log('props', username)
    const [usernames, setUsernames] = useState([])

    useEffect(() => {
        const getUsernames = setTimeout(() => {
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
            clearTimeout(getUsernames)
        }
    }, [newUsername])

    return usernames
}
