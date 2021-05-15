import {OrderError, Order} from "../../types/types";
import {SHOW_LOADER} from "../action-types/auth-action-types";
import {
    FETCH_ORDER_SUCCESS,
    FETCH_USER_ORDERS_SUCCESS,
    ORDER_ADDED_FAILURE,
    ORDER_ADDED_SUCCESS,
    FETCH_USER_ORDERS_BY_QUERY_SUCCESS,
    OrderActionTypes
} from "../action-types/order-action-types";

export type InitialStateType = {
    order:  Partial<Order>
    orders: Array<Order>
    errors: Partial<OrderError>
    loading: boolean
};

const initialState: InitialStateType = {
    order: {},
    orders: [],
    errors: {},
    loading: false
};

const reducer = (state: InitialStateType = initialState, action: OrderActionTypes): InitialStateType => {

    switch (action.type) {
        case SHOW_LOADER:
            return {...state, loading: true};

        case FETCH_ORDER_SUCCESS:
            return {...state, errors: {}, loading: false};

        case ORDER_ADDED_SUCCESS:
            return {...state, order: action.payload, loading: false};

        case ORDER_ADDED_FAILURE:
            return {...state, errors: action.payload, loading: false};

        case FETCH_USER_ORDERS_SUCCESS:
            return {...state, orders: action.payload, loading: false};

        case FETCH_USER_ORDERS_BY_QUERY_SUCCESS:
            return {...state, orders: action.payload, loading: false};

        default:
            return state;
    }
};

export default reducer;
