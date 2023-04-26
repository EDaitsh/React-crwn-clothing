import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';

import { getCategoriesMap } from '../../store/categories/category.selector';
import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss'

const Category = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(getCategoriesMap);
    const [prodeucts, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])
    
    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                
                {
                    prodeucts &&
                        prodeucts.map((product) => (
                            <ProductCard key={product.id} product={product}/>
                        ))
                }
            </div>
        </Fragment>
    )
}

export default Category;