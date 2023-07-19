import {screen} from '@testing-library/react'
import { renderWithProvider } from '../../../utils/test/test.utils'
import CartItem from '../../cart-item/cart-item.component'
import CartIcon from '../cart-icon.component'
import { initCartItems } from '../../../store/cart/cart.action'
import { CartElement } from '@stripe/react-stripe-js'


describe ('Cart Icons tests', () => {
    test('Uses preloaded state to render', () => {
        const intialCartItems = [
            {id:1, name: 'ItemA', imageUrl: 'test', price:10, quantity:1},
            {id:2, name: 'ItemB', imageUrl: 'test', price:10, quantity:2}
        ];

        renderWithProvider(<CartIcon/>, {
            preloadedState: {
                cart: {
                    cartItems: intialCartItems
                }
            }
        });

        const cartIconElement = screen.getByText('3');
        expect(cartIconElement).toBeInTheDocument();
    })
})