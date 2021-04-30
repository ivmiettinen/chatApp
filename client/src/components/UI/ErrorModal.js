import React from 'react'
import ReactDOM from 'react-dom'

const Backdrop = (props) => {
    return <div  onClick={props.onConfirm} />
}

const ErrorModal = (props) => {
    return (
        <React.Fragment>
            {/* {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById('error-message')
            )} */}
            {/* {ReactDOM.createPortal(<ModalOverLay title={props.title} message={props.message} onConfirm={props.onConfirm} />, document.getElementById('overlay-root'))} */}
        </React.Fragment>
    )
}


export default ErrorModal
