import React from 'react'
import ReactDOM from 'react-dom'
import './ErrorModal.css'
import ButtonComponent from './ButtonComponent'

const Backdrop = (props) => {
    return <div className='backdrop' onClick={props.onConfirm} />
}

const ModalOverLay = (props) => {
    return (
        <div className='modal'>
            <header className='header'>
                <h2>{props.title}</h2>
            </header>
            <div className='content'>
                <p>{props.message}</p>
            </div>
            <footer className='actions'>
                <ButtonComponent
                    className='error-button'
                    onClick={props.onConfirm}
                >
                    Ok
                </ButtonComponent>
            </footer>
        </div>
    )
}

const ErrorModal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById('error-background-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverLay
                    title={props.title}
                    message={props.message}
                    onConfirm={props.onConfirm}
                />,
                document.getElementById('error-message-root')
            )}
        </React.Fragment>
    )
}

export default ErrorModal
