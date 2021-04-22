const ButtonComponent = (props) => {
    return <button className={props.className} to={props.to} onClick={props.onClick}>{props.children}</button>
}

export default ButtonComponent
