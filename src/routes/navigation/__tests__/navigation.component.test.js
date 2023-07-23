import {screen, fireEvent} from '@testing-library/react'
import * as reactRedux from 'react-redux'

import Navigation from '../navigation.component'
import { renderWithProvider } from '../../../utils/test/test.utils'
import * as userAction from "../../../store/user/user.action";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
}));
 

describe('Navigation tests', () => {

    const useDispatchMock = reactRedux.useDispatch;
    beforeEach(() => {
        useDispatchMock.mockImplementation(() => () => {});
    })
    afterEach(() => {
        useDispatchMock.mockClear();
    })


    test('It should render a Sign in link and not Sign Out link if there is no currentUser', () =>{
        renderWithProvider(<Navigation/>, {
            preloadedState:{
                user: {
                    currentUser: null,
                }
            }
        });

        const signInLinkElement = screen.getByText(/signin/i);
        expect(signInLinkElement).toBeInTheDocument();

        const signOutLinkElement = screen.queryByText(/sign out/i);
        expect(signOutLinkElement).toBeNull();
    })


    test('It should render Sign Out and not Sign in if there is a currentUser', () => {
        renderWithProvider(<Navigation/>, {
            preloadedState: {
                user: {
                    currentUser: {}
                }
            }
        });

        const signOutLinkElement = screen.getByText(/sign out/i);
        expect(signOutLinkElement).toBeInTheDocument();

        const signInLinkElement = screen.queryByText(/signin/i);
        expect(signInLinkElement).toBeNull();
    })

    test ('it should not render a cart dropdown if isCartOpen is false', () => {
        renderWithProvider(<Navigation/>,{
            preloadedState: {
                cart: {
                    isCartOpen: false,
                    cartItems:[]
                }
            }
        });

        const dropdownTextElement = screen.queryByText(/Your cart is empty/i);
        expect(dropdownTextElement).toBeNull();
    });

    test('it should render a cart dropdown if isCartOpen is true', () => {
        renderWithProvider(<Navigation/>,{
            preloadedState: {
                cart: {
                    isCartOpen: true,
                    cartItems:[]
                }
            }
        });

        const dropdownTextElement = screen.getByText(/Your cart is empty/i);
        expect(dropdownTextElement).toBeInTheDocument();
    })

    test('It should dispatch SignOutStart action when clicking Sign Out Link', async () => {
        
        renderWithProvider(<Navigation/>, {
            preloadedState: {
                user: {
                    currentUser: {}
                }
            }
        });

        const signOutLinkElement = screen.getByText(/sign out/i);

        const signOutStartAction = jest.spyOn(userAction, 'signOutStart');
        expect(signOutLinkElement).toBeInTheDocument();
        await fireEvent.click(signOutLinkElement);
        expect(useDispatchMock).toHaveBeenCalled();
        expect(signOutStartAction).toHaveBeenCalled();

    })
})