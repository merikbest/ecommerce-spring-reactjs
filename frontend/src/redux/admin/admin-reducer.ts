import {
    AdminActionTypes,
    FETCH_ALL_USERS_BY_QUERY_SUCCESS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_USER_INFO_BY_QUERY_SUCCESS,
    FETCH_USER_INFO_SUCCESS,
    FORM_RESET,
    LOADING_DATA,
    PERFUME_ADDED_FAILURE,
    PERFUME_ADDED_SUCCESS,
    PERFUME_UPDATED_FAILURE,
    PERFUME_UPDATED_SUCCESS
} from "./admin-action-types";
import {PerfumeErrors, User} from "../../types/types";

export type AdminState = {
    users: Array<User>
    user: Partial<User>
    errors: Partial<PerfumeErrors>
    isPerfumeAdded: boolean
    isPerfumeEdited: boolean
    isLoaded: boolean
};

const initialState: AdminState = {
    users: [],
    user: {},
    errors: {},
    isPerfumeAdded: false,
    isPerfumeEdited: false,
    isLoaded: false
};

const reducer = (state: AdminState = initialState, action: AdminActionTypes): AdminState => {

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

        case FETCH_USER_INFO_BY_QUERY_SUCCESS:
            return {...state, user: action.payload, isLoaded: false};

        case FETCH_ALL_USERS_BY_QUERY_SUCCESS:
            return {...state, users: action.payload, isLoaded: false};

        case FORM_RESET:
            return {...state, isPerfumeAdded: false, isPerfumeEdited: false, errors: {}};

        default:
            return state;
    }
};

export default reducer;
