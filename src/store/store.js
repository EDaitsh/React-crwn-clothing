import {compose,  applyMiddleware} from 'redux';
import {persistStore, petsistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import {createStore } from "redux"
import { legacy_createStore as createStore } from "redux";
//import logger from 'redux-logger';

import { rootReducer } from './root-reducer';
import persistReducer from 'redux-persist/es/persistReducer';
//const middleWares = [logger];

const loggerMiddleware = (store) => (next) => (action) =>{
    if(!action.type){
        return next(action);
    }
    console.log('type: ', action.type);
    console.log('action: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state: ', store.getState());
}

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [loggerMiddleware];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);