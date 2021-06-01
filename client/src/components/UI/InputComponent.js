const InputComponent = (props) => {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            required
            onChange={props.onChange}
            className={props.className}
        />
    )
}

export default InputComponent
