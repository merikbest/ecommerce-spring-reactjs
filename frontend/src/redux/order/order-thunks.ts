import {Dispatch} from "redux";

import {loadingOrder, orderAddedFailure, orderAddedSuccess} from "./order-actions";
import RequestService from '../../utils/request-service';

export const addOrder = (order: any, history: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(loadingOrder());
        const response = await RequestService.post("/users/order", order);
        history.push("/order/finalize");
        localStorage.removeItem("perfumes");
        dispatch(orderAddedSuccess(response.data));
    } catch (error) {
        dispatch(orderAddedFailure(error.response?.data));
    }
};
