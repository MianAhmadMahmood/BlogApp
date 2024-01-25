import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Header from './Component/Header';
import AddBlog from './Pages/AddBlog';
import AddCategory from './Pages/AddCategory';

import PrivateRoute from './Services/ProctectedRoutes';



const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/*ProtectedRoutes*/}

        <Route path="/" element={<PrivateRoute />} >
        <Route path="/" element={<Home />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/add-category" element={<AddCategory />} />
    
       
        </Route>
      </Routes>
    </>
  );
};

export default App;
