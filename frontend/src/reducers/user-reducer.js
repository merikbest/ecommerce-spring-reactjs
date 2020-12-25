import {USER_UPDATED_SUCCESS} from "../constants/actions-types";

const initialState = {
    success: false
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case USER_UPDATED_SUCCESS:
            return {...state, success: true};

        default:
            return state;
    }
};

export default reducer;