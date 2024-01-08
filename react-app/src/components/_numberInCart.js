export const numberInCart = (user, cart, cartItems, productId) => {
  let product;

  if (user && cart) {
    product = Object.values(cart.products).filter(
      (el) => el.productId === productId
    )[0];
  } else {
    product = Object.values(cartItems).filter(
      (el) => el.productId === productId
    )[0];
  }

  if (product) return product.quantity;
  return 0;
};
