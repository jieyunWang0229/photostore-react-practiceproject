import React, {Suspense} from "react";
import { Fragment } from "react";
import { Route,Routes,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./page/home";
import MainHeader from "./components/Layout/MainHead";
import Cart from "./components/cart/Cart";
import AuthForm from "./components/Auth/AuthForm";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import PhotoListByCatagory from "./components/Photos/PhotoListByCatagory";
import classes from "./App.module.css";

const Products = React.lazy(()=> import('./page/productspage'));
const Productsdetail = React.lazy(()=> import('./page/productsdetailpage'));
const Contactpage = React.lazy(()=>import('./page/contactpage'));
const Orderpage = React.lazy(() =>import('./page/orderpage'));




function App() {
  
   const showCart = useSelector(state => state.ui.cartIsVisible);
   const showLog = useSelector(state => state.ui.logformIsVisible);
   const uid = useSelector(state => state.auth.uid);
   const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  

  return (
    <Fragment>
      <MainHeader />
      {showCart&& <Cart />}
      { showLog && <AuthForm/>}
      <Suspense fallback = { 
                <div>
                  <LoadingSpinner/>
                </div>}>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/products' element={<Products/>}></Route>
          <Route path='/products/friedchicken' element={<PhotoListByCatagory catagory="firedchicken" />}></Route>
          <Route path='/products/mac' element={<PhotoListByCatagory catagory="mac" />}></Route>
          <Route path='/products/animal' element={<PhotoListByCatagory catagory="animal" />}></Route>
          <Route path='/products/:productId' element={<Productsdetail/>}></Route>
          <Route path='/contactme' element={<Contactpage/>}></Route>
          {isLoggedIn && <Route path='/:uid/myorder' element={<Orderpage/>}></Route>}
          <Route path='*' element={<Home/>}></Route>
        </Routes>
       </Suspense>
       <div className={classes.bottomposition}> </div>
    </Fragment>
  );
}

export default App;

