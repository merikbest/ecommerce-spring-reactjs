import { AuthErrors, LoadingStatus } from "../../types/types";
import {
    ACTIVATE_ACCOUNT_FAILURE,
    ACTIVATE_ACCOUNT_SUCCESS,
    AuthActionTypes,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    RESET_AUTH_STATE,
    RESET_PASSWORD_CODE_FAILURE,
    RESET_PASSWORD_CODE_SUCCESS,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_SUCCESS,
    SET_AUTH_LOADING_STATE
} from "./auth-action-types";

export type AuthState = {
    email: string;
    isRegistered: boolean;
    loadingState: LoadingStatus;
    success: string;
    error: string;
    errors: Partial<AuthErrors>;
};

const initialState: AuthState = {
    email: "",
    isRegistered: false,
    loadingState: LoadingStatus.LOADING,
    success: "",
    error: "",
    errors: {}
};

const authReducer = (state: AuthState = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case SET_AUTH_LOADING_STATE:
            return { ...state, loadingState: action.payload, errors: {} };

        case LOGIN_FAILURE:
            return { ...state, error: action.payload };

        case REGISTER_SUCCESS:
            return { ...state, isRegistered: true, loadingState: LoadingStatus.LOADED, errors: {} };

        case REGISTER_FAILURE:
            return { ...state, errors: action.payload, loadingState: LoadingStatus.LOADED };

        case ACTIVATE_ACCOUNT_SUCCESS:
            return { ...state, success: action.payload };

        case ACTIVATE_ACCOUNT_FAILURE:
            return { ...state, error: action.payload };

        case FORGOT_PASSWORD_SUCCESS:
            return { ...state, success: action.payload, loadingState: LoadingStatus.LOADED, errors: {}, error: "" };

        case FORGOT_PASSWORD_FAILURE:
            return { ...state, error: action.payload, loadingState: LoadingStatus.LOADED };

        case RESET_PASSWORD_CODE_SUCCESS:
            return { ...state, email: action.payload };

        case RESET_PASSWORD_CODE_FAILURE:
            return { ...state, error: action.payload };

        case RESET_PASSWORD_SUCCESS:
            return { ...state, success: action.payload };

        case RESET_PASSWORD_FAILURE:
            return { ...state, errors: action.payload };

        case RESET_AUTH_STATE:
            return { ...initialState, loadingState: LoadingStatus.LOADED };

        default:
            return state;
    }
};

export default authReducer;
