import {compose,  applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import {createStore } from "redux"
import { legacy_createStore as createStore } from "redux";
import logger from 'redux-logger';

//import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';
import persistReducer from 'redux-persist/es/persistReducer';
//const middleWares = [logger];



const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sageMidlleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
    process.env.NODE_ENV!== 'production' && logger,
    //thunk,
    sageMidlleware
].filter(Boolean);

const composeEnhacer = 
    (process.env.NODE_ENV !== 'production' && 
     window &&
     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
     compose;

const composedEnhancers = composeEnhacer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sageMidlleware.run(rootSaga);

export const persistor = persistStore(store);