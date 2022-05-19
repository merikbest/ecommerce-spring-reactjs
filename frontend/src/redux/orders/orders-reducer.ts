import {Order} from "../../types/types";
import {
    FETCH_USER_ORDERS_BY_QUERY_SUCCESS,
    FETCH_USER_ORDERS_SUCCESS,
    LOADING_ORDERS,
    OrdersActionTypes
} from "./orders-action-types";

export type OrdersState = {
    orders: Array<Order>
    loading: boolean
};

const initialState: OrdersState = {
    orders: [],
    loading: false
};

const reducer = (state: OrdersState = initialState, action: OrdersActionTypes): OrdersState => {

    switch (action.type) {
        case LOADING_ORDERS:
            return {...state, loading: true};
            
        case FETCH_USER_ORDERS_SUCCESS:
            return {...state, orders: action.payload, loading: false};

        case FETCH_USER_ORDERS_BY_QUERY_SUCCESS:
            return {...state, orders: action.payload, loading: false};

        default:
            return state;
    }
};

export default reducer;
