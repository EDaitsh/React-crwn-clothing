import {Fragment, useContext} from 'react'
import { useSelector } from 'react-redux';
import { getCategoriesMap } from '../../store/categories/category.selector';

import {CategoriesCotext} from '../../contexts/categories.context'
import CategoryPreview from '../../components/category-preview/category-preview.component'

const CategoriesPreview = () => {
    //const {categoriesMap} = useContext(CategoriesCotext);
    const categoriesMap = useSelector(getCategoriesMap);
    return (
        <Fragment>
        {
             Object.keys(categoriesMap).map((title) => (
                <CategoryPreview key={title} title={title} products={categoriesMap[title]}/>
            ))
        };
        </Fragment>
    );
}

export default CategoriesPreview;