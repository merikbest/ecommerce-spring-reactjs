import {
    FETCH_ORDER_SUCCESS,
    ORDER_ADDED_SUCCESS,
    ORDER_ADDED_FAILURE,
    ORDER_CONFIRMED_SUCCESS,
    FETCH_USER_ORDERS_SUCCESS,
    SHOW_LOADER
} from "../utils/constants/actions-types";
import {OrderError, Order} from "../types/types";

type InitialStateType = {
    orders: Array<Order>
    errors: OrderError | {}
    orderIndex: string
    loading: boolean
};

const initialState: InitialStateType = {
    orders: [],
    errors: {},
    orderIndex: "",
    loading: false
};

const reducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    const {type, payload} = action;

    switch (type) {
        case SHOW_LOADER:
            return {...state, loading: true};

        case FETCH_ORDER_SUCCESS:
            return {...state, errors: {}, loading: false};

        case ORDER_ADDED_SUCCESS:
            return {...state, loading: false};

        case ORDER_ADDED_FAILURE:
            return {...state, errors: payload, loading: false};

        case ORDER_CONFIRMED_SUCCESS:
            return {...state, orderIndex: payload};

        case FETCH_USER_ORDERS_SUCCESS:
            return {...state, orders: payload};

        default:
            return state;
    }
};

export default reducer;
