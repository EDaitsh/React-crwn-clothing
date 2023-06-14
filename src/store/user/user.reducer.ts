import { AnyAction } from 'redux';

import { UserData } from '../../utils/firebase/firebase.utils';
import {
    setCurrentUser,
    signInSuccess,
    signInFailed,
    signUpFailed,
    signOutSuccess,
    signOutFailed
}  from './user.action';


export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
};

export const userReducer = (
    state = INITIAL_STATE, 
    action: AnyAction 
) : UserState => {
    if(setCurrentUser.match(action)){
        return{
            ...state,
            currentUser: action.payload
        }
    }

    if(signInSuccess.match(action)){
        return{
            ...state,
            currentUser: action.payload,
            isLoading: false
        } 
    }

    if(signOutSuccess.match(action)){
        return{
            ...state,
            currentUser:null,
            isLoading: false
        }
    }

    if(
        signInFailed.match(action) ||
        signOutFailed.match(action) ||
        signUpFailed.match(action)
    ){
        return{
            ...state,
            isLoading:false,
            error: action.payload
        }
    }
    
    return state;
}


