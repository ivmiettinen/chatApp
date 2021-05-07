import { useState, useEffect } from 'react'
import chatServiceClient from './chatServiceClient'

export const UseChatters = (username) => {
    // console.log('props', confirmUsername)
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
        }, 500)

        return () => {
            clearTimeout(getUsernames)
        }
    }, [username])

    return usernames
}
