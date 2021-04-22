const InputComponent = (props) => {

   
    return (
        <input
            type='text'
            placeholder={props.placeholder}
            value={props.value}
            required
            onChange={props.onChange}
            className='text-input-field'
        />
    )
}

export default InputComponent
