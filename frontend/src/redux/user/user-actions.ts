import { AuthErrors, LoadingStatus, ReviewError, User, UserEditErrors } from "../../types/types";
import {
    LOGOUT_SUCCESS,
    LogoutSuccessActionType,
    RESET_INPUT_FORM,
    ResetInputFormActionType,
    SET_UPDATED_USER,
    SET_USER,
    SET_USER_LOADING_STATE,
    SetUpdatedUserActionType,
    SetUserActionType,
    SetUserLoadingStateActionType,
    USER_ADDED_REVIEW_FAILURE,
    USER_ADDED_REVIEW_SUCCESS,
    USER_UPDATED_FAILURE,
    USER_UPDATED_PASSWORD_FAILURE,
    USER_UPDATED_PASSWORD_SUCCESS,
    UserAddedReviewFailureActionType,
    UserAddedReviewSuccessActionType,
    UserUpdatedFailureActionType,
    UserUpdatedPasswordFailureActionType,
    UserUpdatedPasswordSuccessActionType
} from "./user-action-types";

export const setUserLoadingState = (status: LoadingStatus): SetUserLoadingStateActionType => ({
    type: SET_USER_LOADING_STATE,
    payload: status
});

export const setUser = (user: User): SetUserActionType => ({
    type: SET_USER,
    payload: user
});

export const setUpdatedUser = (user: User): SetUpdatedUserActionType => ({
    type: SET_UPDATED_USER,
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
    type: RESET_INPUT_FORM
});

export const logoutSuccess = (): LogoutSuccessActionType => ({
    type: LOGOUT_SUCCESS
});
