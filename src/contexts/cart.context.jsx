import { createContext, useReducer } from "react";

import {createAction} from '../utils/reducer/reducer.utils'

const addCartItem = (cartItems, productToAdd) => {
    const existsingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    if(existsingCartItem){
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
    }
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemve) => {
    const existsingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemve.id);
    if(existsingCartItem.quantity ===1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemve.id)
    }
    return cartItems.map((cartItem) => 
        cartItem.id === cartItemToRemve.id 
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );
}

const clearCartItem = (cartItems, cartItemToRemve) => cartItems.filter(cartItem => cartItem.id !== cartItemToRemve.id);


export const CartContext= createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0

})

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const cartReducer = (state, action) => {
    const {type, payload} = action;
    //const {cartItems, cartCount, cartTotal} = payload;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in UserReducer`);
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

export const CartProvider = ({children}) => {

    const [state, dispatcher] = useReducer(cartReducer, INITIAL_STATE);
    const {isCartOpen, cartItems, cartCount, cartTotal} = state;

    const setIsCartOpen = (bool) => {
        dispatcher(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,bool))
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems,productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems,cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToRemove) => {
        const newCartItems = clearCartItem(cartItems,cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }
   
    const updateCartItemsReducer= (newCartItems) => {
       
        //console.log(cartItems);
        const newCartCount = newCartItems.reduce((acumelator, currentValue) => acumelator + currentValue.quantity, 0)
        const newCartTotal = newCartItems.reduce((total, item) => total +(item.quantity * item.price),0)
        //console.log(newCartCount);
        dispatcher(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal
                }
        ));
    }

    const value = {
        isCartOpen,
        setIsCartOpen, 
        cartItems, 
        addItemToCart, 
        removeItemFromCart,
        clearItemFromCart,
        cartCount, 
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
