import {AuthErrors, ReviewError, User, UserEditErrors} from "../../types/types";
import {
    FETCH_USER_SUCCESS,
    USER_ADDED_REVIEW_FAILURE,
    USER_ADDED_REVIEW_SUCCESS,
    USER_UPDATED_FAILURE,
    USER_UPDATED_PASSWORD_FAILURE,
    USER_UPDATED_PASSWORD_SUCCESS,
    USER_UPDATED_SUCCESS,
    RESET_INPUT_FORM,
    FetchUserSuccessActionType,
    UserAddedReviewFailureActionType,
    UserAddedReviewSuccessActionType,
    UserUpdatedFailureActionType,
    UserUpdatedPasswordFailureActionType,
    UserUpdatedPasswordSuccessActionType,
    UserUpdatedSuccessActionType,
    ResetInputFormActionType
} from "../action-types/user-actions-types";

export const fetchUserSuccess = (user: User): FetchUserSuccessActionType => ({
    type: FETCH_USER_SUCCESS,
    payload: user
});

export const userUpdatedSuccess = (user: User): UserUpdatedSuccessActionType => ({
    type: USER_UPDATED_SUCCESS,
    payload: user
});

export const userUpdatedFailure = (errors: UserEditErrors): UserUpdatedFailureActionType => ({
    type: USER_UPDATED_FAILURE,
    payload: errors
});

export const userUpdatedPasswordSuccess = (message: string): UserUpdatedPasswordSuccessActionType => ({
    type: USER_UPDATED_PASSWORD_SUCCESS,
    payload: message
});

export const userUpdatedPasswordFailure = (errors: AuthErrors): UserUpdatedPasswordFailureActionType => ({
    type: USER_UPDATED_PASSWORD_FAILURE,
    payload: errors
});

export const userAddedReviewSuccess = (): UserAddedReviewSuccessActionType => ({
    type: USER_ADDED_REVIEW_SUCCESS
});

export const userAddedReviewFailure = (errors: ReviewError): UserAddedReviewFailureActionType => ({
    type: USER_ADDED_REVIEW_FAILURE,
    payload: errors
});

export const resetInputForm = (): ResetInputFormActionType => ({
    type: RESET_INPUT_FORM,
});
