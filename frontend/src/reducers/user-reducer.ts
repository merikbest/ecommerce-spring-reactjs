import {
    USER_UPDATED_SUCCESS,
    USER_ADDED_REVIEW_SUCCESS,
    USER_ADDED_REVIEW_FAILURE
} from "../utils/constants/actions-types";
import {ReviewError} from "../types/types";

type InitialStateType = {
    success: boolean,
    errors: ReviewError | {}
};

const initialState: InitialStateType = {
    success: false,
    errors: {}
};

const reducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    const {type, payload} = action;

    switch (type) {
        case USER_UPDATED_SUCCESS:
            return {...state, success: true};

        case USER_ADDED_REVIEW_SUCCESS:
            return {...state, errors: {}};

        case USER_ADDED_REVIEW_FAILURE:
            return {...state, errors: payload};

        default:
            return state;
    }
};

export default reducer;
