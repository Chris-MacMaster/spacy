
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
    return totalCost.toFixed(2)
}


export const urlChecka = url => {
    const pattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    return pattern.test(url)
}

//      console.log(urlChecka("https://www.google.com")); // true
// console.log(urlChecka("http://example.com/path/to/page.html")); // true
// console.log(urlChecka("ftp://ftp.example.com")); // false
// console.log(urlChecka("http://255.255.255.255:8080")); // true
// console.log(urlChecka("invalid_url")); // false
