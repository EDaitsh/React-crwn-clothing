import {Fragment} from 'react'
import { useSelector } from 'react-redux';
import { getCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';

import Spinner from '../../components/spinner/spinner.component';

import CategoryPreview from '../../components/category-preview/category-preview.component'

const CategoriesPreview = () => {
    const categoriesMap = useSelector(getCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    
    return (
        <Fragment>
        {
            isLoading? (
                <Spinner/>
            ):
            (
                Object.keys(categoriesMap).map((title) => (
                    <CategoryPreview key={title} title={title} products={categoriesMap[title]}/>
                ))
            )
        };
        </Fragment>
    );
}

export default CategoriesPreview;