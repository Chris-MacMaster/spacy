import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Header from "./components/Header";
import Landing from "./components/Landing";
import SearchResults from "./components/SearchResults";
import ProductDetail from "./components/Products/ProductDetail";
import PostReviewForm from "./components/PostReviewForm";
import EditReviewForm from './components/EditReviewForm'
import DisplayCart from "./components/Cart";
import ShopDetails from "./components/ShopDetails";
import UserDetails from "./components/UserDetails";
import Footer from "./components/Footer";
import ProductCreateForm from "./components/Forms/ProductCreate";
import ProductEditForm from "./components/Forms/ProductEdit";
import FilteredSearchResults from "./components/FilteredSearchResults";
import PostShopForm from "./components/PostShopForm";
import PutShopForm from "./components/PutShopForm";
import CustomerPurchases from "./components/Purchases/CustomerPurchases"
import ShopOrders from "./components/Purchases/ShopOrders"

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
      <Route path='/search/:parameters' exact={true} component={SearchResults} />
      <Route path='/products/:productId' exact={true} component={ProductDetail} />
      <Route path='/products/forms/create-product/:shopId' exact={true} component={ProductCreateForm} />
      <Route path='/products/forms/edit-product/:productId' exact={true} component={ProductEditForm} />
      <Route path='/cart' exact={true} component={DisplayCart} />
      <Route path='/shops/new' exact={true} component={PostShopForm} />
      <Route path='/shops/:shopId' exact={true} component={ShopDetails} />
      <Route path='/users/:userId' exact={true} component={UserDetails} />
      <Route path='/product-reviews/:productId/new' exact={true} component={PostReviewForm} />
      <Route path='/product-reviews/:reviewId/edit' exact={true} component={EditReviewForm} />
      <Route path='/search/filtered-search/:category' exact={true} component={FilteredSearchResults} />
      <Route path='/shops/edit/:shopId' exact={true} component={PutShopForm} />
      <Route path='/shops/:shopId/orders' exact={true} component={ShopOrders} />
      <Route path='/purchases' exact={true} component={CustomerPurchases} />
    </Switch>
    <Footer />
    </>
  );
}

export default App;
