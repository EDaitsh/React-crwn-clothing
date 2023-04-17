import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import './cart-dropdown.styles.scss'

import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
    const {cartItems, setIsCartOpen, isCartOpen} = useContext(CartContext);
    const navigate = useNavigate();

    const gotoCheckoutHandler = () => {
        setIsCartOpen(!isCartOpen);
        navigate('/checkout');
    }

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => 
                    {
                    return (<CartItem key={item.id} cartItem={item}/>)
                    }
                )}
            </div>
            <Button onClick={gotoCheckoutHandler}>GOTO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;