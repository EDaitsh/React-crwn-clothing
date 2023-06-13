import { AnyAction } from 'redux';

import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { setCartItems, setIsCartOpen, initCartItems } from "./cart.action";

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
}


const CART_INITIAL_STATE : CartState = {
    isCartOpen: false,
    cartItems: [],
}

export const cartReducer = (
    state = CART_INITIAL_STATE, 
    action: AnyAction
): CartState => {
   
    if(setIsCartOpen.match(action)){
        return{
            ...state,
            isCartOpen: action.payload
        }
    }

    if(initCartItems.match(action)){
        return{
            ...state,
            cartItems: CART_INITIAL_STATE.cartItems
        }
    }

    if(setCartItems.match(action)){
        return{
            ...state,
            cartItems: action.payload
        }
    }

    return state;

    //const {cartItems, cartCount, cartTotal} = payload;
    // switch (type) {
    //     case CART_ACTION_TYPES.SET_CART_ITEMS:
    //         return{
    //             ...state,
    //             cartItems: payload
    //         }
    //     case CART_ACTION_TYPES.SET_IS_CART_OPEN:
    //         return{
    //             ...state,
    //             isCartOpen: payload
    //         }
    //     case CART_ACTION_TYPES.INIT_CART_ITEMS:
    //         return{
    //             ...state,
    //             cartItems: CART_INITIAL_STATE.cartItems
    //         }
    //     default:
    //         return state;
    // }
}
