import React from 'react'
import ReactDOM from 'react-dom'

const Backdrop = (props) => {
    console.log('propsaaa', props)
    return <div onClick={props.onConfirm} />
}

const ModalOverLay = (props) => {
    return (
        <div>
            <header>
                <h2>{props.title}</h2>
            </header>
            <div>
                <p>{props.message}</p>
            </div>
            <footer>
                <button onClick={props.onConfirm}>Okay</button>
            </footer>
        </div>
    )
}

const ErrorModal = (props) => {
    console.log('prosdaasps', props)

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
