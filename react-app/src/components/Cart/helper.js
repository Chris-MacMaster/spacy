//
/*
GIVE ME AN ARRAY OF OBJECTS
MAKE A NEW SET CONTAINING NUMBERS.
ITERATE THROUGH THE ARRAY
IF ARRAY[I] SHOP.ID IS NOT IN SET,
MAKE A NEW ARRAY AND PUT THAT ITEM INSIDE IT.


RETURN [[ITEMS FROM SHOP BLAHBLAH],[ITEMS FROM SHOP BLOOPBLOP]]


*/

export const groupItemsByStore = (cart) =>{
    const itemsByStore = {}
    for (const i in cart){
        if (!itemsByStore[cart[i].shopName]){
            itemsByStore[cart[i].shopName] = [cart[i]]
        } else {
            itemsByStore[cart[i].shopName].push(cart[i])
        }
    }
    return itemsByStore
}
