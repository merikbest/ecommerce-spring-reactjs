import { AuthErrors, LoadingStatus, ReviewError, User, UserEditErrors } from "../../types/types";
import {
    LOGOUT_SUCCESS,
    RESET_INPUT_FORM,
    SET_UPDATED_USER,
    SET_USER,
    SET_USER_LOADING_STATE,
    USER_ADDED_REVIEW_FAILURE,
    USER_ADDED_REVIEW_SUCCESS,
    USER_UPDATED_FAILURE,
    USER_UPDATED_PASSWORD_FAILURE,
    USER_UPDATED_PASSWORD_SUCCESS,
    UserActionTypes
} from "./user-action-types";

export type UserState = {
    user?: User;
    loadingState: LoadingStatus;
    successMessage: string;
    userEditErrors: Partial<UserEditErrors>;
    userResetPasswordErrors: Partial<AuthErrors>;
    reviewErrors: Partial<ReviewError>;
    isReviewAdded: boolean;
};

const initialState: UserState = {
    user: undefined,
    loadingState: LoadingStatus.LOADING,
    successMessage: "",
    userEditErrors: {},
    userResetPasswordErrors: {},
    reviewErrors: {},
    isReviewAdded: false
};

const userReducer = (state: UserState = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case SET_USER_LOADING_STATE:
            return { ...state, loadingState: action.payload };

        case SET_USER:
            return { ...state, user: action.payload, loadingState: LoadingStatus.LOADED };

        case SET_UPDATED_USER:
            return { ...state, user: action.payload, userEditErrors: {} };

        case USER_UPDATED_FAILURE:
            return { ...state, userEditErrors: action.payload };

        case USER_UPDATED_PASSWORD_SUCCESS:
            return { ...state, successMessage: action.payload, userResetPasswordErrors: {} };

        case USER_UPDATED_PASSWORD_FAILURE:
            return { ...state, userResetPasswordErrors: action.payload };

        case USER_ADDED_REVIEW_SUCCESS:
            return { ...state, reviewErrors: {}, isReviewAdded: true };

        case USER_ADDED_REVIEW_FAILURE:
            return { ...state, reviewErrors: action.payload, isReviewAdded: false };

        case RESET_INPUT_FORM:
            return { ...state, userResetPasswordErrors: {}, successMessage: "", userEditErrors: {}, reviewErrors: {} };

        case LOGOUT_SUCCESS:
            return { ...state, user: undefined };

        default:
            return state;
    }
};

export default userReducer;
