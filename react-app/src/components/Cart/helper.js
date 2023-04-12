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

    const ans = {}

    for (const item of cart) {
        if (!ans[item.shopId]){
            console.log(item.shopId)
            ans[item.shopId] = {"arr": [item]}
            ans[item.shopId].name = item.shopName
        } else ans[item.shopId].arr.push(item)
    }

    console.log("!!!!!!!!", ans)
    return ans
}
