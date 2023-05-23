import { useDispatch } from "react-redux";
import {  } from "../../store/cart"

export default function addLocalCartToUserCartOnSignin(cartArr){
    const dispatch = useDispatch();

    async () => {
        for (const item in cart) {
            await dispatch(addCartItemThunk())
        }
    }
}
