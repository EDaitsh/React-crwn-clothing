import { createContext, useState, useEffect } from "react";

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

export const CartProvider = ({children}) => {
    const [isCartOpen , setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const addItemToCart= (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    
    const removeItemFromCart= (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToRemove) => {
        setCartItems(clearCartItem(cartItems, cartItemToRemove));
    }

    useEffect (()=> 
    {
        setCartCount(cartItems.reduce((acumelator, currentValue) => acumelator + currentValue.quantity, 0));
        setCartTotal(cartItems.reduce((total, item) => total +(item.quantity * item.price),0));
    }, [cartItems])
   

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
