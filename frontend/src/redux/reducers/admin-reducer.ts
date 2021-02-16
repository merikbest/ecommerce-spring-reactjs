import {
    PERFUME_ADDED_SUCCESS,
    PERFUME_UPDATED_SUCCESS,
    PERFUME_ADDED_FAILURE,
    PERFUME_UPDATED_FAILURE,
    FETCH_USER_SUCCESS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_ORDERS_SUCCESS,
    FORM_RESET,
    FETCH_PERFUMES
} from "../action-types/admin-action-types";
import {Order, PerfumeErrors, Perfume, User} from "../../types/types";
import {AdminActionTypes} from "../action-types/admin-action-types";

type InitialStateType = {
    perfumes: Array<Perfume>
    orders: Array<Order>
    users: Array<User>
    user: Partial<User>
    errors: Partial<PerfumeErrors>
    success: boolean
};

const initialState: InitialStateType = {
    perfumes: [],
    orders: [],
    users: [],
    user: {},
    errors: {},
    success: false
};

const reducer = (state: InitialStateType = initialState, action: AdminActionTypes): InitialStateType => {

    switch (action.type) {
        case FETCH_PERFUMES:
            return {...state, perfumes: action.payload};

        case PERFUME_ADDED_SUCCESS:
            return {...state, success: true, errors: {}};

        case PERFUME_ADDED_FAILURE:
            return {...state, success: false, errors: action.payload};

        case PERFUME_UPDATED_SUCCESS:
            return {...state, success: true, errors: {}};

        case PERFUME_UPDATED_FAILURE:
            return {...state, success: false, errors: action.payload};

        case FETCH_USER_SUCCESS:
            return {...state, user: action.payload};

        case FETCH_ALL_USERS_SUCCESS:
            return {...state, users: action.payload};

        case FETCH_ALL_USERS_ORDERS_SUCCESS:
            return {...state, orders: action.payload};

        case FORM_RESET:
            return {...state, success: false, errors: {}};

        default:
            return state;
    }
};

export default reducer;
