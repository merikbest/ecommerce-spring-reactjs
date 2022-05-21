import { Dispatch } from "redux";

import { calculateCartPrice, loadingCart, setCartItemsCount } from "./cart-actions";
import RequestService from "../../utils/request-service";
import { setPerfumes } from "../perfumes/perfumes-actions";
import { USERS_CART } from "../../constants/urlConstants";

export const fetchCart = (data: Array<number>) => async (dispatch: Dispatch) => {
    dispatch(loadingCart());
    const response = await RequestService.post(USERS_CART, data);
    dispatch(setPerfumes(response.data));
    dispatch(setCartItemsCount(response.data.length));
    dispatch(calculateCartPrice(response.data));
};
