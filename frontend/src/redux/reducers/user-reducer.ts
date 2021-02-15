import {ReviewError} from "../../types/types";
import {
    USER_ADDED_REVIEW_FAILURE,
    USER_ADDED_REVIEW_SUCCESS,
    USER_UPDATED_SUCCESS,
    UserActionsTypes
} from "../action-types/user-actions-types";

type InitialStateType = {
    success: boolean,
    errors: Partial<ReviewError>
};

const initialState: InitialStateType = {
    success: false,
    errors: {}
};

const reducer = (state: InitialStateType = initialState, action: UserActionsTypes): InitialStateType => {

    switch (action.type) {
        case USER_UPDATED_SUCCESS:
            return {...state, success: true};

        case USER_ADDED_REVIEW_SUCCESS:
            return {...state, errors: {}};

        case USER_ADDED_REVIEW_FAILURE:
            return {...state, errors: action.payload};

        default:
            return state;
    }
};

export default reducer;
