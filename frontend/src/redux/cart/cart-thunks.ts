import {Dispatch} from "redux";

import {calculateCartPrice, loadingCart, setCartItemsCount} from "./cart-actions";
import RequestService from '../../utils/request-service';
import {setPerfumes} from "../perfumes/perfumes-actions";

export const fetchCart = (data: Array<number>) => async (dispatch: Dispatch) => {
    dispatch(loadingCart());
    const response = await RequestService.post("/users/cart", data);
    dispatch(setPerfumes(response.data));
    dispatch(setCartItemsCount(response.data.length));
    dispatch(calculateCartPrice(response.data));
};
