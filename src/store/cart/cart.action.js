import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
    console.log(cartItems);
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


export const setIsCartOpen= (boolean) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);


export const addItemToCart = (cartItems, productToAdd) => {
        const newCartItems = addCartItem(cartItems,productToAdd);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
    }

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems,cartItemToRemove);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
    }

export const clearItemFromCart = (cartItems, cartItemToRemove) => {
        const newCartItems = clearCartItem(cartItems,cartItemToRemove);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
    }