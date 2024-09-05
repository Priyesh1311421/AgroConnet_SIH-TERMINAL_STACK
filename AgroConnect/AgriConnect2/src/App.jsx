import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SignUpComponent from './components/Signup';
import LoginComponent from './components/login';
import FarmingHomePage from './components/Home';
import Marketplace from './components/MarketPlace';
import ProductManager from './components/AddProduct';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<FarmingHomePage/>}></Route>
          <Route path='/marketplace' element={<Marketplace/>}></Route>
          <Route path='/chatbot' element={<>Chat</>}></Route>
          <Route path='/speakeasy' element={<>Easy</>}></Route>
          <Route path='/signup' element={ <SignUpComponent/> }></Route>
          <Route path='/login' element={<LoginComponent/>}></Route>
          <Route path='/userProducts' element={<ProductManager/>}></Route>
          <Route path='/userPosts' element={<h1>UserPosts</h1>}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;