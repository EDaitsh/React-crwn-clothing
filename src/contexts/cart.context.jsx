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

export const CartContext= createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0

})

export const CartProvider = ({children}) => {
    const [isCartOpen , setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const addItemToCart= (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
        console.log(cartItems);
    }

    useEffect (()=> 
    {
        setCartCount(cartItems.reduce((acumelator, currentValue) => acumelator + currentValue.quantity, 0))
    }, [cartItems])
   

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
