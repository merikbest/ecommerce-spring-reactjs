import {Order} from "../../types/types";
import {LOADING_ORDERS, OrdersActionTypes, RESET_ORDERS_STATE, SET_USER_ORDERS,} from "./orders-action-types";

export type OrdersState = {
    orders: Array<Order>
    loading: boolean
};

const initialState: OrdersState = {
    orders: [],
    loading: true
};

const reducer = (state: OrdersState = initialState, action: OrdersActionTypes): OrdersState => {

    switch (action.type) {
        case LOADING_ORDERS:
            return {...state, loading: true};
            
        case SET_USER_ORDERS:
            return {...state, orders: action.payload, loading: false};

        case RESET_ORDERS_STATE:
            return {orders: [], loading: true};
            
        default:
            return state;
    }
};

export default reducer;
