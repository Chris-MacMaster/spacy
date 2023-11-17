import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    // Retrieve cart items from local storage on component mount
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
    }
  }, []);

  useEffect(() => {
    // Save cart items to local storage when it changes
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item, quantity) => {
    console.log(item);
    quantity = +quantity;
    const newCart = { ...cartItems };
    if (!newCart[item.id]) {
      item.quantity = quantity;
      item.shopName = item.Shop?.name;
      item.productImage = item?.ProductImages[0]?.url;
      item.productId = item.id;
      newCart[item.id] = item;
      setCartItems(newCart);
    } else {
      newCart[item.id].quantity += quantity;

      if (newCart[item.id].available < newCart[item.id].quantity)
        newCart[item.id].quantity = newCart[item.id].available;
      setCartItems(newCart);
    }
  };

  const removeFromLocalCart = (itemId) => {
    const newCart = { ...cartItems };
    delete newCart[itemId];
    setCartItems(newCart);
  };

  const quantityChange = (itemId, quantity) => {
    const newCart = { ...cartItems };
    newCart[itemId].quantity = quantity;
    setCartItems(newCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromLocalCart,
        quantityChange,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
