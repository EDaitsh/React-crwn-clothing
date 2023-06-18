import { FC, InputHTMLAttributes } from 'react'

import {Input, Group, FormInputLable} from './form-input.styles'

type FormInputProps = {lable: string} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({lable, ...otherProps}) => {
    return (
        <Group>
            <Input {...otherProps}/>  
            {lable && (
                <FormInputLable shrink={Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length)}>
                    {lable}
                </FormInputLable>
            ) }
        </Group>
    )
}

export default FormInput

