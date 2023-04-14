import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
// import Navigation from "./components/Navigation";
import { authenticate } from "./store/session";
import Header from "./components/Header";
import Landing from "./components/Landing";
import ProductsIndex from "./components/Products/ProductsIndex.js";
import UserProducts from "./components/Products/UserProducts.js"

import SearchResults from "./components/SearchResults";
import ProductDetail from "./components/Products/ProductDetail";
import PostReviewForm from "./components/PostReviewForm";
import EditReviewForm from './components/EditReviewForm'
import DisplayCart from "./components/Cart";
import ShopDetails from "./components/ShopDetails";
import UserDetails from "./components/UserDetails";
import ProductCreateForm from "./components/Forms/ProductCreate";
import ProductEditForm from "./components/Forms/ProductEdit";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <Header isLoaded={isLoaded} />
    <Switch>
      <Route path='/' component={Landing} isLoaded={isLoaded} exact={true} />
      <Route path='/products' exact={true} component={ProductsIndex}/>
      <Route path='/products/current' exact={true} component={UserProducts}/>
      <Route path='/search/:parameters' component={SearchResults}/>
      <Route path='/products/:productId' exact={true} component={ProductDetail}/>
      <Route path='/products/forms/create-product/:shopId' exact={true} component={ProductCreateForm} />
      <Route path='/products/forms/edit-product/:productId' exact={true} component={ProductEditForm} />
      <Route path='/cart' exact={true} component={DisplayCart} />
      <Route path='/shops/:shopId' exact={true} component={ShopDetails}/>
      <Route path='/users/:userId' exact={true} component={UserDetails}/>
      <Route path='/product-reviews/:productId/new' component={PostReviewForm}/>
      <Route path='/product-reviews/:reviewId/edit' component={EditReviewForm}/>
    </Switch>
    </>
  );
}

export default App;
