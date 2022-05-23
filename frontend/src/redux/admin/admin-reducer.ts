import {
    AdminActionTypes,
    PERFUME_ADDED_FAILURE,
    PERFUME_ADDED_SUCCESS,
    PERFUME_DELETED_SUCCESS,
    PERFUME_UPDATED_FAILURE,
    PERFUME_UPDATED_SUCCESS,
    RESET_ADMIN_STATE,
    SET_ADMIN_LOADING_STATE,
    SET_ALL_USERS,
    SET_USER_INFO
} from "./admin-action-types";
import { LoadingStatus, PerfumeErrors, User } from "../../types/types";

export type AdminState = {
    users: Array<User>;
    user: Partial<User>;
    errors: Partial<PerfumeErrors>;
    isPerfumeAdded: boolean;
    isPerfumeEdited: boolean;
    isPerfumeDeleted: boolean;
    loadingState: LoadingStatus;
};

const initialState: AdminState = {
    users: [],
    user: {},
    errors: {},
    isPerfumeAdded: false,
    isPerfumeEdited: false,
    isPerfumeDeleted: false,
    loadingState: LoadingStatus.LOADING
};

const adminReducer = (state: AdminState = initialState, action: AdminActionTypes): AdminState => {
    switch (action.type) {
        case SET_ADMIN_LOADING_STATE:
            return { ...state, loadingState: action.payload };

        case PERFUME_ADDED_SUCCESS:
            return { ...state, isPerfumeAdded: true, errors: {}, loadingState: LoadingStatus.LOADED };

        case PERFUME_ADDED_FAILURE:
            return { ...state, isPerfumeAdded: false, errors: action.payload, loadingState: LoadingStatus.LOADED };

        case PERFUME_UPDATED_SUCCESS:
            return { ...state, isPerfumeEdited: true, errors: {}, loadingState: LoadingStatus.LOADED };

        case PERFUME_UPDATED_FAILURE:
            return { ...state, isPerfumeEdited: false, errors: action.payload, loadingState: LoadingStatus.LOADED };

        case PERFUME_DELETED_SUCCESS:
            return { ...state, isPerfumeDeleted: true, errors: {}, loadingState: LoadingStatus.LOADED };

        case SET_USER_INFO:
            return { ...state, user: action.payload, loadingState: LoadingStatus.LOADED };

        case SET_ALL_USERS:
            return { ...state, users: action.payload, loadingState: LoadingStatus.LOADED };

        case RESET_ADMIN_STATE:
            return {
                users: [],
                user: {},
                errors: {},
                isPerfumeAdded: false,
                isPerfumeEdited: false,
                isPerfumeDeleted: false,
                loadingState: LoadingStatus.LOADING
            };

        default:
            return state;
    }
};

export default adminReducer;
