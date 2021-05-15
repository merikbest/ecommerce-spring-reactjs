import {
    PERFUME_ADDED_SUCCESS,
    PERFUME_UPDATED_SUCCESS,
    PERFUME_ADDED_FAILURE,
    PERFUME_UPDATED_FAILURE,
    FETCH_USER_INFO_SUCCESS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_ORDERS_SUCCESS,
    FETCH_USER_ORDERS_SUCCESS,
    FORM_RESET,
    FETCH_USER_INFO_BY_QUERY_SUCCESS,
    FETCH_ALL_USERS_BY_QUERY_SUCCESS,
    FETCH_ALL_USERS_ORDERS_BY_QUERY_SUCCESS,
    FETCH_USER_ORDERS_BY_QUERY_SUCCESS,
    LOADING_DATA
} from "../action-types/admin-action-types";
import {Order, PerfumeErrors, User} from "../../types/types";
import {AdminActionTypes} from "../action-types/admin-action-types";

export type InitialStateType = {
    orders: Array<Order>
    userOrders: Array<Order>
    users: Array<User>
    user: Partial<User>
    errors: Partial<PerfumeErrors>
    isPerfumeAdded: boolean
    isPerfumeEdited: boolean
    isLoaded: boolean
};

const initialState: InitialStateType = {
    orders: [],
    userOrders: [],
    users: [],
    user: {},
    errors: {},
    isPerfumeAdded: false,
    isPerfumeEdited: false,
    isLoaded: false
};

const reducer = (state: InitialStateType = initialState, action: AdminActionTypes): InitialStateType => {

    switch (action.type) {
        case LOADING_DATA:
            return {...state, isLoaded: true};

        case PERFUME_ADDED_SUCCESS:
            return {...state, isPerfumeAdded: true, errors: {}};

        case PERFUME_ADDED_FAILURE:
            return {...state, isPerfumeAdded: false, errors: action.payload};

        case PERFUME_UPDATED_SUCCESS:
            return {...state, isPerfumeEdited: true, errors: {}};

        case PERFUME_UPDATED_FAILURE:
            return {...state, isPerfumeEdited: false, errors: action.payload};

        case FETCH_USER_INFO_SUCCESS:
            return {...state, user: action.payload, isLoaded: false};

        case FETCH_ALL_USERS_SUCCESS:
            return {...state, users: action.payload, isLoaded: false};

        case FETCH_ALL_USERS_ORDERS_SUCCESS:
            return {...state, orders: action.payload, isLoaded: false};

        case FETCH_USER_ORDERS_SUCCESS:
            return {...state, userOrders: action.payload};

        case FETCH_USER_INFO_BY_QUERY_SUCCESS:
            return {...state, user: action.payload, isLoaded: false};

        case FETCH_ALL_USERS_BY_QUERY_SUCCESS:
            return {...state, users: action.payload, isLoaded: false};

        case FETCH_ALL_USERS_ORDERS_BY_QUERY_SUCCESS:
            return {...state, orders: action.payload, isLoaded: false};

        case FETCH_USER_ORDERS_BY_QUERY_SUCCESS:
            return {...state, userOrders: action.payload, isLoaded: false};

        case FORM_RESET:
            return {...state, isPerfumeAdded: false, isPerfumeEdited: false, errors: {}};

        default:
            return state;
    }
};

export default reducer;
