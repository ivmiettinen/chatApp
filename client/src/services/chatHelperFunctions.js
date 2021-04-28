import { useState, useEffect } from 'react'
import chatServiceClient from './chatServiceClient'

export const UseChatters = () => {
    const [usernames, setUsernames] = useState([])

    useEffect(() => {
        chatServiceClient
            .getAll()
            .then((chatters) => {
                setUsernames(chatters)
            })
            .catch((err) => {
                console.log('error with get request', err)
            })
    }, [])

    return usernames
}
