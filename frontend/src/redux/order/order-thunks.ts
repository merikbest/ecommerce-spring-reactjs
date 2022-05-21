import { Dispatch } from "redux";
import { History, LocationState } from "history";

import { loadingOrder, orderAddedFailure, setOrder } from "./order-actions";
import RequestService from "../../utils/request-service";
import { OrderRequest } from "../../types/types";
import { USERS_ORDER } from "../../constants/urlConstants";
import { ORDER_FINALIZE } from "../../constants/routeConstants";

export const addOrder = (order: OrderRequest, history: History<LocationState>) => async (dispatch: Dispatch) => {
    try {
        dispatch(loadingOrder());
        const response = await RequestService.post(USERS_ORDER, order);
        history.push(ORDER_FINALIZE);
        localStorage.removeItem("perfumes");
        dispatch(setOrder(response.data));
    } catch (error) {
        dispatch(orderAddedFailure(error.response?.data));
    }
};
