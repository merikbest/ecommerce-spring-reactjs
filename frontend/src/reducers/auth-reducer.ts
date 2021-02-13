import {
    LOGIN_SUCCESS,
    FORM_RESET,
    REGISTER_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_FAILURE,
    LOGOUT_SUCCESS,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    ACTIVATE_ACCOUNT_SUCCESS,
    ACTIVATE_ACCOUNT_FAILURE,
    RESET_PASSWORD_CODE_SUCCESS,
    RESET_PASSWORD_CODE_FAILURE,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    SHOW_LOADER,
    FETCH_ACCOUNT_SUCCESS
} from "../utils/constants/actions-types";
import {AuthErrors, User} from "../types/types";

type InitialStateType = {
    user: User | {}
    userRole: string
    isLoggedIn: boolean
    isRegistered: boolean
    loading: boolean
    success: string
    error: string
    errors: AuthErrors | {}
};

const initialState: InitialStateType = {
    user: {},
    userRole: "",
    isLoggedIn: false,
    isRegistered: false,
    loading: false,
    success: "",
    error: "",
    errors: {}
};

const reducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    const {type, payload} = action;

    switch (type) {
        case SHOW_LOADER:
            return {...state, loading: true, errors: {}};

        case LOGIN_SUCCESS:
            return {...state, isLoggedIn: true, userRole: payload};

        case LOGIN_FAILURE:
            return {...state, error: payload};

        case REGISTER_SUCCESS:
            return {...state, isRegistered: true, loading: false, errors: {}};

        case REGISTER_FAILURE:
            return {...state, errors: payload, loading: false};

        case ACTIVATE_ACCOUNT_SUCCESS:
            return {...state, success: payload};

        case ACTIVATE_ACCOUNT_FAILURE:
            return {...state, error: payload};

        case FORGOT_PASSWORD_SUCCESS:
            return {...state, success: payload, loading: false, errors: {}, error: ""};

        case FORGOT_PASSWORD_FAILURE:
            return {...state, error: payload, loading: false};

        case RESET_PASSWORD_CODE_SUCCESS:
            return {...state, user: payload};

        case RESET_PASSWORD_CODE_FAILURE:
            return {...state, error: payload};

        case RESET_PASSWORD_SUCCESS:
            return {...state, success: payload};

        case RESET_PASSWORD_FAILURE:
            return {...state, errors: payload};

        case LOGOUT_SUCCESS:
            return {...state, isLoggedIn: false, user: {}, userRole: ""};

        case FORM_RESET:
            return {...state, error: "", errors: {}, success: "", isRegistered: false, loading: false};

        case FETCH_ACCOUNT_SUCCESS:
            return {...state, isLoggedIn: true, userRole: payload};

        default:
            return state;
    }
};

export default reducer;

