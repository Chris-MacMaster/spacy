import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    // Retrieve cart items from local storage on component mount
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
    }
  }, []);

  useEffect(() => {
    // Save cart items to local storage when it changes
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    // console.log(cartItems)
    const newCart = {...cartItems}
    if (!newCart[item.id]){
        item.quantity = 1
        item.shopName = item.Shop.name
        item.productImage = item.ProductImages[0].url
        newCart[item.id] = item
        setCartItems(newCart);
    } else {
        newCart[item.id].quantity++
        setCartItems(newCart)
    }
  };

  const removeFromLocalCart = (itemId) => {
    console.log("whaddup?")
    const newCart = {...cartItems}
    console.log(newCart)
    console.log(itemId)
    delete newCart[itemId]
    console.log(newCart)
    setCartItems(newCart)
    console.log(cartItems)
  };

  const quantityChange = (item, quantity) => {
    const newCart = {...cartItems}
    newCart[item.id].quantity = quantity
    setCartItems(newCart)
  }

  const clearCart = () => {
    setCartItems([]);
  };


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromLocalCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
