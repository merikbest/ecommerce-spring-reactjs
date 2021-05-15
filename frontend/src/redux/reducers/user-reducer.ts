import {AuthErrors, ReviewError, User, UserEditErrors} from "../../types/types";
import { LOGOUT_SUCCESS } from "../action-types/auth-action-types";
import {
    FETCH_USER_SUCCESS,
    USER_ADDED_REVIEW_FAILURE,
    USER_ADDED_REVIEW_SUCCESS,
    USER_UPDATED_FAILURE,
    USER_UPDATED_PASSWORD_FAILURE,
    USER_UPDATED_PASSWORD_SUCCESS,
    USER_UPDATED_SUCCESS,
    RESET_INPUT_FORM,
    FETCH_USER_BY_QUERY_SUCCESS,
    LOADING_USER_INFO,
    UserActionsTypes
} from "../action-types/user-actions-types";

export type InitialStateType = {
    user: Partial<User>
    isLoggedIn: boolean
    isLoaded: boolean
    successMessage: string
    userEditErrors: Partial<UserEditErrors>
    userResetPasswordErrors: Partial<AuthErrors>
    reviewErrors: Partial<ReviewError>
    isReviewAdded: boolean
};

const initialState: InitialStateType = {
    user: {},
    isLoggedIn: false,
    isLoaded: false,
    successMessage: "",
    userEditErrors: {},
    userResetPasswordErrors: {},
    reviewErrors: {},
    isReviewAdded: false
};

const reducer = (state: InitialStateType = initialState, action: UserActionsTypes): InitialStateType => {

    switch (action.type) {
        case LOADING_USER_INFO:
            return {...state, isLoaded: true}

        case FETCH_USER_SUCCESS:
            return {...state, user: action.payload, isLoggedIn: true, isLoaded: false}

        case USER_UPDATED_SUCCESS:
            return {...state, user: action.payload, userEditErrors: {}};

        case USER_UPDATED_FAILURE:
            return {...state, userEditErrors: action.payload};

        case USER_UPDATED_PASSWORD_SUCCESS:
            return {...state, successMessage: action.payload, userResetPasswordErrors: {}};

        case USER_UPDATED_PASSWORD_FAILURE:
            return {...state, userResetPasswordErrors: action.payload};

        case USER_ADDED_REVIEW_SUCCESS:
            return {...state, reviewErrors: {}, isReviewAdded: true};

        case USER_ADDED_REVIEW_FAILURE:
            return {...state, reviewErrors: action.payload, isReviewAdded: false};

        case RESET_INPUT_FORM:
            return {...state, userResetPasswordErrors: {}, successMessage: "", userEditErrors: {}, reviewErrors: {}};

        case LOGOUT_SUCCESS:
            return {...state, user: {}, isLoggedIn: false}

        case FETCH_USER_BY_QUERY_SUCCESS:
            return {...state, user: action.payload, isLoggedIn: true, isLoaded: false}

        default:
            return state;
    }
};

export default reducer;
