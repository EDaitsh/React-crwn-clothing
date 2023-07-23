import { screen } from "@testing-library/react";
import Category from "../category.component";
import { renderWithProvider } from "../../../utils/test/test.utils";
import { useParams } from "react-router-dom";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        category: 'mens',
    })
}))

describe("Category tests", () => {
    
    test('It should render a Spinner if isLoading is true', () => {
        renderWithProvider(<Category/>,{
            preloadedState: {
                categories:{
                    isLoading: true,
                    categories: []
                }
            }
        });

        const spinnerElement = screen.getByTestId('spinner');
        expect(spinnerElement).toBeInTheDocument();

    });

    test ('It should render Products if isLoading is false', () => {
        renderWithProvider(<Category/>,{
            preloadedState: {
                categories:{
                    isLoading: false,
                    categories: [
                        {
                            title:'mens',
                            items:[
                                {id:1, name: 'Product 1'},
                                {id:2, name: 'Product 2'}
                            ]
                        }
                    ]
                }
            }
        });

        const spinnerElement = screen.queryByTestId('spinner');
        expect(spinnerElement).toBeNull();

        const productElement = screen.getByAltText(/Product 1/i);
        expect(productElement).toBeInTheDocument();

    })

    


});

