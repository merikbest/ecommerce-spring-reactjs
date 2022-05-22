import { LoadingStatus, Order } from "../../types/types";
import {
    OrdersActionTypes,
    RESET_ORDERS_STATE,
    SET_ORDERS_LOADING_STATE,
    SET_USER_ORDERS
} from "./orders-action-types";

export type OrdersState = {
    orders: Array<Order>;
    loadingState: LoadingStatus;
};

const initialState: OrdersState = {
    orders: [],
    loadingState: LoadingStatus.LOADING
};

const ordersReducer = (state: OrdersState = initialState, action: OrdersActionTypes): OrdersState => {
    switch (action.type) {
        case SET_ORDERS_LOADING_STATE:
            return { ...state, loadingState: action.payload };

        case SET_USER_ORDERS:
            return { ...state, orders: action.payload, loadingState: LoadingStatus.LOADED };

        case RESET_ORDERS_STATE:
            return { ...initialState };

        default:
            return state;
    }
};

export default ordersReducer;
