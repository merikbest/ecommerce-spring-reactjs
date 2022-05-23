import { Dispatch } from "redux";

import { calculateCartPrice, setCartItemsCount, setCartLoadingState } from "./cart-actions";
import RequestService from "../../utils/request-service";
import { setPerfumes } from "../perfumes/perfumes-actions";
import { USERS_CART } from "../../constants/urlConstants";
import { LoadingStatus } from "../../types/types";

export const fetchCart = (perfumeIds: Array<number>) => async (dispatch: Dispatch) => {
    dispatch(setCartLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.post(USERS_CART, perfumeIds);
    dispatch(setPerfumes(response.data));
    dispatch(setCartItemsCount(response.data.length));
    dispatch(calculateCartPrice(response.data));
};
