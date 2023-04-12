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
import ReviewForm from "./components/Forms/ProductCreate";
import DisplayCart from "./components/Cart";
import ShopDetails from "./components/ShopDetails";
import UserDetails from "./components/UserDetails";

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
      <Route path='/products' exact={true}>
        <ProductsIndex />
      </Route>
      <Route path='/products/current' exact={true}>
        <UserProducts />
      </Route>
      <Route path='/search/:parameters'>
        <SearchResults />
      </Route>
      <Route path='/products/:productId' exact={true}>
        <ProductDetail />
      </Route>
      <Route path='/products/forms/create-product' exact={true}>
        <ReviewForm />
      </Route>
      <Route path='/cart' exact={true}>
        <DisplayCart/>
      </Route>
      <Route path='/shops/:shopId' exact={true} component={ShopDetails}/>
      <Route path='/users/:userId' exact={true} component={UserDetails}/>
      <Route path='/product-reviews/:productId/new'>
        <PostReviewForm />
      </Route>
      <Route path='/product-reviews/:reviewId/edit'>
        <EditReviewForm />
      </Route>
    </Switch>
      {/* <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path={'/products/current'}>
            <UserProducts />
          </Route>
        </Switch>
      )} */}
    </>
  );
}

export default App;


/*
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
// import Navigation from "./components/Navigation";
import Header from "./components/Header";
import { Switch } from "react-router-dom";
import Route from "express/lib/router/route";
import Landing from "./components/Landing";


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
        <Route path='/' component={Landing} />
      </Switch>
      {/* <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )} */
