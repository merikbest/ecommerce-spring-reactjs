import {Dispatch} from "redux";

import {fetchUserOrdersByQuerySuccess, fetchUserOrdersSuccess, loadingOrders} from "./orders-actions";
import RequestService from '../../utils/request-service';
import {ordersByEmailQuery} from "../../utils/graphql-query/orders-query";

export const fetchUserOrders = () => async (dispatch: Dispatch) => {
    dispatch(loadingOrders());
    const response = await RequestService.get("/users/orders", true);
    dispatch(fetchUserOrdersSuccess(response.data));
};

export const fetchUserOrdersByQuery = (email: string | undefined) => async (dispatch: Dispatch) => {
    dispatch(loadingOrders());
    const response = await RequestService.post("/users/graphql/orders", {query: ordersByEmailQuery(email)}, true);
    dispatch(fetchUserOrdersByQuerySuccess(response.data.data.ordersByEmail));
};
