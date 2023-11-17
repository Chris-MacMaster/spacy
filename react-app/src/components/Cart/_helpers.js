//Takes in the cart state object.
//Make return object.
//for each product in the cart->
//Check to see if return object has a key of the shopName that sells the product.
//If it doesn't,
//make a new key in return object of shopname with a value of an array with the product inside
//if it does
//add it to the array!
//return object
export const groupItemsByStore = (cart) => {
  const itemsByStore = {};
  if (!cart) return null;
  for (const i in cart) {
    if (!itemsByStore[cart[i].shopName]) {
      itemsByStore[cart[i].shopName] = [cart[i]];
    } else {
      itemsByStore[cart[i].shopName].push(cart[i]);
    }
    if (cart[i].freeShipping)
      itemsByStore[cart[i].shopName].freeShipping = true;
  }
  return itemsByStore;
};

export const totalCost = (cart) => {
  let totalCost = 0;
  for (const i in cart) totalCost += cart[i].quantity * cart[i].price;
  return totalCost.toFixed(2);
};

export const urlChecka = (url) => {
  const pattern =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
  if (!pattern.test(url)) return false;
  if (["img", "jpg", "jpeg", "png"].includes(url.split(".").pop())) return true;
  return false;
};
