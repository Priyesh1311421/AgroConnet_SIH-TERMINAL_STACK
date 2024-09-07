import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SignUpComponent from './components/Signup';
import LoginComponent from './components/Login';
import FarmingHomePage from './components/Home';
import Marketplace from './components/MarketPlace';
import ProductManager from './components/AddProduct';
import UserSignup from './components/Users/userSignup';
import AddPost from './components/AddPosts';
import Dashboard from './components/Dashboard';
import FarmingHomePage2 from './components/Home2';
import Chatbot from './component2/Chatbot';
import OrderMessage from './components/OrderMessage';
// import SignupComponent2 from './components/Signup';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<FarmingHomePage/>}></Route>
          <Route path='/userSignup' element={<UserSignup/>}></Route>
          <Route path='/marketplace' element={<Marketplace/>}></Route>
          {/* <Route path='/chatbot' element={<>Chat</>}></Route> */}
          <Route path='/speakeasy' element={<>Easy</>}></Route>
          <Route path='/signup' element={ <SignUpComponent/> }></Route>
          <Route path='/login' element={<LoginComponent/>}></Route>
          <Route path='/userProducts' element={<ProductManager/>}></Route>
          <Route path='/userPosts' element ={<AddPost/>}></Route>
          <Route path='/addProducts' element ={<ProductManager/>}></Route>
          <Route path='/userOrders' element ={<h1>MyOrders</h1>}></Route>
          <Route path='/OrderMessage' element ={<OrderMessage/>}></Route>
          <Route path='/dashboard' element ={<Dashboard/>}></Route>
          {/* <Route path="/BlogList" element={<BlogList farmerId={farmerId} />} /> */}
          {/* <Route path="/blogs/:id" element={<BlogDetail />} /> */}
          {/* {farmerId && <Route path="/create" element={<CreateBlog />} />} */}
          <Route path='/chatbot' element={<Chatbot/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;