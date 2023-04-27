import {compose,  applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import {createStore } from "redux"
import { legacy_createStore as createStore } from "redux";
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';
import persistReducer from 'redux-persist/es/persistReducer';
//const middleWares = [logger];



const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV!== 'production' && logger].filter(Boolean);
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);