import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from '../shop-data.js'

import {addCollectionAndDocuments, getCategoriesAndDocuments} from '../utils/firebase/firebase.utils'

export const CategoriesCotext = createContext({
    CategoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = {categoriesMap};

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, [])


    useEffect(() => {
        const getCategoriesMap = async() => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, []);

    return (
        <CategoriesCotext.Provider value={value}>{children}</CategoriesCotext.Provider>
    )
}