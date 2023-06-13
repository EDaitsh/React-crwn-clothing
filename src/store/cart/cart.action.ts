import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from "../categories/category.types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem) : CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], cartItemToRemve: CartItem): CartItem[] => {
    const existsingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemve.id);
    if(existsingCartItem && existsingCartItem.quantity ===1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemve.id)
    }
    return cartItems.map((cartItem) => 
        cartItem.id === cartItemToRemve.id 
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );
}

const clearCartItem = (cartItems: CartItem[], cartItemToRemve: CartItem) : CartItem[] => 
    cartItems.filter(cartItem => cartItem.id !== cartItemToRemve.id);

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type InitCartItems = Action<CART_ACTION_TYPES.INIT_CART_ITEMS>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen= withMatcher((boolean: boolean): SetIsCartOpen => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);

export const initCartItems = withMatcher((): InitCartItems => 
    createAction(CART_ACTION_TYPES.INIT_CART_ITEMS)
);

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
        const newCartItems = addCartItem(cartItems,productToAdd);
        return setCartItems(newCartItems);
    }

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
        const newCartItems = removeCartItem(cartItems,cartItemToRemove);
        return setCartItems(newCartItems);
    }

export const clearItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
        const newCartItems = clearCartItem(cartItems,cartItemToRemove);
        return setCartItems(newCartItems);
    }