import { Outlet} from 'react-router-dom';

import Directory from '../../components/directory/directory.component'

const Home = () => {
  return (
    <div>
      <Directory />
      <Outlet />
    </div>
    // <Routes>
    //     <Route index element={<Directory/>}/>
    //     <Route path= ":category" element={<Category/>} />
    // </Routes>
  );
}

export default Home;
