import { LoadingStatus, Order, OrderError, OrderItem } from "../../types/types";
import {
    ORDER_ADDED_FAILURE,
    OrderActionTypes,
    RESET_ORDER_STATE,
    SET_ORDER,
    SET_ORDER_ERROR,
    SET_ORDER_ITEMS,
    SET_ORDER_LOADING_STATE
} from "./order-action-types";

export type OrderState = {
    order: Partial<Order>;
    orderItems: Array<OrderItem>;
    errors: Partial<OrderError>;
    errorMessage: string;
    loadingState: LoadingStatus;
};

const initialState: OrderState = {
    order: {},
    orderItems: [],
    errors: {},
    errorMessage: "",
    loadingState: LoadingStatus.LOADING
};

const orderReducer = (state: OrderState = initialState, action: OrderActionTypes): OrderState => {
    switch (action.type) {
        case SET_ORDER_LOADING_STATE:
            return { ...state, loadingState: action.payload };

        case SET_ORDER:
            return { ...state, order: action.payload, loadingState: LoadingStatus.LOADED };

        case SET_ORDER_ITEMS:
            return { ...state, orderItems: action.payload };

        case SET_ORDER_ERROR:
            return { ...state, errorMessage: action.payload, loadingState: LoadingStatus.ERROR };

        case ORDER_ADDED_FAILURE:
            return { ...state, errors: action.payload, loadingState: LoadingStatus.ERROR };

        case RESET_ORDER_STATE:
            return { ...initialState };

        default:
            return state;
    }
};

export default orderReducer;
