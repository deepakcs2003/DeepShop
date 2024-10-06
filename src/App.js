import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

import './App.css';
function App() {
  const [cartProductCount,setCartProductCount]=useState(0)
  const dispatch=useDispatch()
  const userdetails = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await fetch(summaryApi.user.url, {
        method: summaryApi.user.method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Include the token in the Authorization header
        },
        credentials: "include" // This may or may not be necessary depending on your setup
      });
      const userDataApi = await response.json();
      if(userDataApi.success){
        dispatch(setUserDetails(userDataApi.data));
      }
      // console.log("user data here", userDataApi);
    } catch (err) {
      console.error("User data is not found", err);
    }
  };

  const fetchAddToCartCount=async(req,res)=>{
    try{
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await fetch(summaryApi.add_to_cart_count.url, {
        method: summaryApi.add_to_cart_count.method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Include the token in the Authorization header
        },
        credentials: "include" // This may or may not be necessary depending on your setup
      });
      const dataApi = await response.json();
      setCartProductCount(dataApi?.totalQuantity)
      // console.log("dataApi",dataApi.totalQuantity)
    }catch(err){

    }
  }
  useEffect(() => {
    userdetails();
    fetchAddToCartCount();
  }, []);

  return (
    <Context.Provider value={{ userdetails,cartProductCount,fetchAddToCartCount}}>
      <ToastContainer />
      <Header />
      <main className='mt-44 md:mt-16 overflow-hidden '>
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
  );
}

export default App;
