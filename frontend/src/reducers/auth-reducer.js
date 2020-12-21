import {LOGIN_SUCCESS, REGISTER_SUCCESS, LOGIN_FAILURE, REGISTER_FAILURE} from "../constants/actions-types";

const initialState = {
    user: {
        email: "",
        token: "",
        userRole: "",
        perfumeList: ""
    },
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
                }
            };

        case LOGIN_FAILURE:
            return {...state, error: payload};

        case REGISTER_SUCCESS:
            return {...state};

        case REGISTER_FAILURE:
            return {...state, errors: payload};

        default:
            return state;
    }
};

export default reducer;

