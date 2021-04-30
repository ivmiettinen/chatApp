const ButtonComponent = (props) => {
    return <button className={props.className} to={props.to} onClick={props.onClick} value={props.value}>{props.children}</button>
}

export default ButtonComponent
