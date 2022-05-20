import {AuthErrors, ReviewError, User, UserEditErrors} from "../../types/types";
import {LOGOUT_SUCCESS} from "../auth/auth-action-types";
import {
    LOADING_USER_INFO,
    RESET_INPUT_FORM,
    SET_UPDATED_USER,
    SET_USER,
    USER_ADDED_REVIEW_FAILURE,
    USER_ADDED_REVIEW_SUCCESS,
    USER_UPDATED_FAILURE,
    USER_UPDATED_PASSWORD_FAILURE,
    USER_UPDATED_PASSWORD_SUCCESS,
    UserActionTypes
} from "./user-action-types";

export type UserState = {
    user: Partial<User>
    isLoggedIn: boolean
    isLoaded: boolean
    successMessage: string
    userEditErrors: Partial<UserEditErrors>
    userResetPasswordErrors: Partial<AuthErrors>
    reviewErrors: Partial<ReviewError>
    isReviewAdded: boolean
};

const initialState: UserState = {
    user: {},
    isLoggedIn: false,
    isLoaded: false,
    successMessage: "",
    userEditErrors: {},
    userResetPasswordErrors: {},
    reviewErrors: {},
    isReviewAdded: false
};

const reducer = (state: UserState = initialState, action: UserActionTypes): UserState => {

    switch (action.type) {
        case LOADING_USER_INFO:
            return {...state, isLoaded: true}

        case SET_USER:
            return {...state, user: action.payload, isLoggedIn: true, isLoaded: false}

        case SET_UPDATED_USER:
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

        default:
            return state;
    }
};

export default reducer;
