import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {selectIsCartOpen, selectCartItems } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action';

import Button from '../button/button.component';
import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles'

import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
    const dispatch = useDispatch();

    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItems = useSelector(selectCartItems);

    const navigate = useNavigate();

    const gotoCheckoutHandler = () => {
        dispatch(setIsCartOpen(!isCartOpen));
        navigate('/checkout');
    }

    return(
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ?
                    (cartItems.map((item) => 
                    {
                    return (<CartItem key={item.id} cartItem={item}/>)
                    }
                    )): 
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                }
            </CartItems>
            <Button onClick={gotoCheckoutHandler}>GOTO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;