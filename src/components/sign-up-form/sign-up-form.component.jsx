import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from '../form-input/form-input.component'
import Button from "../button/button.component";
import { signUpStart } from "../../store/user/user.action";

import './sign-up-form.styles.scss'

const defaultFormFields= {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    //console.log(formFields);
    const resetFormFields = () => { 
        setFormFields(defaultFormFields);
    }



    const handlerChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit= async(event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }
         
        try{
           
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        } catch(error){
            console.error(error);
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    lable="Display Name" 
                    type="text" 
                    required onChange={handlerChange} 
                    name="displayName"
                    value={displayName}
                />
                <FormInput 
                    lable="Email"
                    type="email" 
                    required onChange={handlerChange} 
                    name="email"
                    value={email}
                />
                <FormInput 
                    lable="Password"
                    type="password" 
                    required onChange={handlerChange}   
                    name="password"
                    value={password}
                />
                <FormInput 
                    lable="Confirm Password"
                    type="password" 
                    required onChange={handlerChange} 
                    name="confirmPassword"
                    value={confirmPassword}
                />
                <Button 
                    type="submit"
                    children="Sign Up"
                />
            </form>
        </div>
    )
}

export default SignUpForm;