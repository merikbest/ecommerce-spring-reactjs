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
    RESET_PASSWORD_FAILURE
} from "../utils/constants/actions-types";

const initialState = {
    user: {},
    isLoggedIn: false,
    isRegistered: false,
    success: "",
    error: "",
    errors: {}
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {...state, isLoggedIn: true};

        case LOGIN_FAILURE:
            return {...state, error: payload};

        case REGISTER_SUCCESS:
            return {...state, isRegistered: true};

        case REGISTER_FAILURE:
            return {...state, errors: payload};

        case ACTIVATE_ACCOUNT_SUCCESS:
            return {...state, success: payload};

        case ACTIVATE_ACCOUNT_FAILURE:
            return {...state, error: payload};

        case FORGOT_PASSWORD_SUCCESS:
            return {...state, success: payload};

        case FORGOT_PASSWORD_FAILURE:
            return {...state, error: payload};

        case RESET_PASSWORD_CODE_SUCCESS:
            return {...state, user: payload};

        case RESET_PASSWORD_CODE_FAILURE:
            return {...state, error: payload};

        case RESET_PASSWORD_SUCCESS:
            return {...state, success: payload};

        case RESET_PASSWORD_FAILURE:
            return {...state, errors: payload};

        case LOGOUT_SUCCESS:
            return {...state, isLoggedIn: false, user: {}};

        case FORM_RESET:
            return {...state, error: "", errors: {}, success: "", isRegistered: false};

        default:
            return state;
    }
};

export default reducer;

