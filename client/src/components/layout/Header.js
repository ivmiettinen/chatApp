import React from 'react'
import ChatIcon from '@material-ui/icons/Chat'
import './Header.css'

const Header = () => {
    return (
        <>
            <div className='header'>
                <div className='chatIconDiv'>
                    <ChatIcon style={{ fontSize: 140 }}></ChatIcon>
                </div>
                <div className='chatAppDiv'>chatApp</div>
            </div>
        </>
    )
}

export default Header

