import { Route, Routes } from 'react-router-dom';

import Directory from '../../components/directory/directory.component'
import Category from '../category/category.component';

const Home = () => {

 

  return (
    //<Directory categories={categories}/>
    <Routes>
        <Route index element={<Directory/>}/>
        <Route path= ":category" element={<Category/>} />
    </Routes>
  );
}

export default Home;
