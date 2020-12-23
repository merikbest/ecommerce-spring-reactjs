import {LOGIN_SUCCESS, REGISTER_SUCCESS, LOGIN_FAILURE, REGISTER_FAILURE, LOGOUT_SUCCESS} from "../constants/actions-types";

const initialState = {
    user: {
        email: "",
        token: "",
        userRole: "",
        perfumeList: ""
    },
    isLoggedIn: false,
    error: "",
    errors: {},
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    email: payload.email,
                    token: payload.token,
                    userRole: payload.userRole,
                    perfumeList: payload.perfumeList.length
                },
                isLoggedIn: true
            };

        case LOGIN_FAILURE:
            return {...state, error: payload};

        case REGISTER_SUCCESS:
            return {...state};

        case REGISTER_FAILURE:
            return {...state, errors: payload};

        case LOGOUT_SUCCESS:
            return {...state, isLoggedIn: false, user: {perfumeList: ""}};

        default:
            return state;
    }
};

export default reducer;

