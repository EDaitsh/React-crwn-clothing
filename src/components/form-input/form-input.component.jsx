import {Input, Group, FormInputLable} from './form-input.styles'

const FormInput = ({lable, ...otherProps}) => {
    return (
        <Group>
            <Input {...otherProps}/>  
            {lable && (
                <FormInputLable shrink={otherProps.value.length}>
                    {lable}
                </FormInputLable>
            ) }
        </Group>
    )
}

export default FormInput

