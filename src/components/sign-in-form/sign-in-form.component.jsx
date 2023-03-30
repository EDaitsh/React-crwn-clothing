import { useEffect, useContext } from 'react';
import { getRedirectResult } from 'firebase/auth'

import {
    auth,
    signInWithGooglePopup,
    signWithGoogleRedirect,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils'


import { useState } from "react";
import FormInput from '../form-input/form-input.component'
import Button from "../button/button.component";
import {UserContext} from '../../contexts/user.context'
import './sign-in-form.styles.scss'

const defaultFormFields= {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const {setCurrentUser} = useContext(UserContext);
     // useEffect(() => {
    //     logGoogleRedirectUser();
    //  }
    // , []);

    // const logGoogleRedirectUser= async () =>{
    //     const response = await getRedirectResult(auth);
    //     if(response){
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //         console.log(userDocRef);
    //     }
    // }





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
        
        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email, password)
            console.log(user);
            setCurrentUser(user);

            resetFormFields();
        } catch(error){
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
                    break;
            }
        }
    };

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };


    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                <div className='buttons-container'>
                    <Button 
                    type="submit"
                    children="Sign In"
                    />
                    <Button
                        type="button"
                        onClick={signInWithGoogle}
                        buttonType="google"
                        children="Google sign in"
                    />
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;