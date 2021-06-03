import React from 'react'
import ChatIcon from '@material-ui/icons/Chat'
import './Header.css'

const Header = () => {
    return (
        <>
            <div class='header'>
                <div class='chatIconDiv'>
                    <ChatIcon style={{ fontSize: 140 }}></ChatIcon>
                </div>
                <div class='chatAppDiv'>chatApp</div>
            </div>
        </>
    )
}

export default Header
