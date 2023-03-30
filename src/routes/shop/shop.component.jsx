import {useContext} from 'react'
import {ProductsCotext} from '../../contexts/products.context'
import ProductCard from '../../components/product-card/product-card.component'
import './shop.syles.scss'

const Shop = () => {
    const {products} = useContext(ProductsCotext);
    return (
        <div className='products-container'>
            {products.map((product) => (
                <ProductCard
                    key={product.key}
                    product ={product}
                />
                )
            )}
        </div>
    )
}

export default Shop;