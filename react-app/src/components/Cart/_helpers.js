
//Takes in the cart state object.
//Make return object.
//for each product in the cart->
    //Check to see if return object has a key of the shopName that sells the product.
    //If it doesn't,
        //make a new key in return object of shopname with a value of an array with the product inside
    //if it does
        //add it to the array!
//return object
export const groupItemsByStore = (cart) =>{
    const itemsByStore = {}
    console.log(cart)
    for (const i in cart){
        if (!itemsByStore[cart[i].shopName]){
            itemsByStore[cart[i].shopName] = [cart[i]]
        } else {
            itemsByStore[cart[i].shopName].push(cart[i])
        }
    }
    return itemsByStore
}


export const totalCost = cart => {
    let totalCost = 0
    for (const i in cart) totalCost += (cart[i].quantity * cart[i].price)
    // for (const i in cart) console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW", cart[i])
    return totalCost.toFixed(2)
}
