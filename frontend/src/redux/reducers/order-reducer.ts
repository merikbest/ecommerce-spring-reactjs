import {OrderError, Order} from "../../types/types";
import {SHOW_LOADER} from "../action-types/auth-action-types";
import {
    FETCH_ORDER_SUCCESS,
    FETCH_USER_ORDERS_SUCCESS,
    ORDER_ADDED_FAILURE,
    ORDER_ADDED_SUCCESS,
    ORDER_CONFIRMED_SUCCESS,
    OrderActionTypes
} from "../action-types/order-action-types";

type InitialStateType = {
    orders: Array<Order>
    errors: Partial<OrderError>
    orderIndex: string
    loading: boolean
};

const initialState: InitialStateType = {
    orders: [],
    errors: {},
    orderIndex: "",
    loading: false
};

const reducer = (state: InitialStateType = initialState, action: OrderActionTypes): InitialStateType => {

    switch (action.type) {
        case SHOW_LOADER:
            return {...state, loading: true};

        case FETCH_ORDER_SUCCESS:
            return {...state, errors: {}, loading: false};

        case ORDER_ADDED_SUCCESS:
            return {...state, loading: false};

        case ORDER_ADDED_FAILURE:
            return {...state, errors: action.payload, loading: false};

        case ORDER_CONFIRMED_SUCCESS:
            return {...state, orderIndex: action.payload};

        case FETCH_USER_ORDERS_SUCCESS:
            return {...state, orders: action.payload};

        default:
            return state;
    }
};

export default reducer;
