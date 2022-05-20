import {Dispatch} from "redux";
import {History, LocationState} from "history";

import {loadingOrder, orderAddedFailure, setOrder} from "./order-actions";
import RequestService from '../../utils/request-service';
import {OrderRequest} from "../../types/types";

export const addOrder = (order: OrderRequest, history: History<LocationState>) => async (dispatch: Dispatch) => {
    try {
        dispatch(loadingOrder());
        const response = await RequestService.post("/users/order", order);
        history.push("/order/finalize");
        localStorage.removeItem("perfumes");
        dispatch(setOrder(response.data));
    } catch (error) {
        dispatch(orderAddedFailure(error.response?.data));
    }
};
