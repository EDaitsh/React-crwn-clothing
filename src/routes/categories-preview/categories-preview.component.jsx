import {Fragment, useContext} from 'react'
import { useSelector } from 'react-redux';
import { getCategoriesMap } from '../../store/categories/category.selector';

import CategoryPreview from '../../components/category-preview/category-preview.component'

const CategoriesPreview = () => {
    const categoriesMap = useSelector(getCategoriesMap);
    console.log(categoriesMap);
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