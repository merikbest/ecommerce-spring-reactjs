import {AuthErrors, LoadingStatus, ReviewError, User, UserEditErrors} from "../../types/types";

export const SET_USER_LOADING_STATE = "user/SET_USER_LOADING_STATE";
export const SET_USER = "user/SET_USER";
export const SET_UPDATED_USER = "user/SET_UPDATED_USER";
export const USER_UPDATED_FAILURE = "user/USER_UPDATED_FAILURE";
export const USER_UPDATED_PASSWORD_SUCCESS = "user/USER_UPDATED_PASSWORD_SUCCESS";
export const USER_UPDATED_PASSWORD_FAILURE = "user/USER_UPDATED_PASSWORD_FAILURE";
export const USER_ADDED_REVIEW_SUCCESS = "user/USER_ADDED_REVIEW_SUCCESS";
export const USER_ADDED_REVIEW_FAILURE = "user/USER_ADDED_REVIEW_FAILURE";
export const RESET_INPUT_FORM = "user/RESET_INPUT_FORM";
export const LOGOUT_SUCCESS = "user/LOGOUT_SUCCESS";

export type SetUserLoadingStateActionType = {
    type: typeof SET_USER_LOADING_STATE;
    payload: LoadingStatus;
};

export type SetUserActionType = {
    type: typeof SET_USER;
    payload: User;
};

export type SetUpdatedUserActionType = {
    type: typeof SET_UPDATED_USER;
    payload: User;
};

export type UserUpdatedFailureActionType = {
    type: typeof USER_UPDATED_FAILURE;
    payload: UserEditErrors;
};

export type UserUpdatedPasswordSuccessActionType = {
    type: typeof USER_UPDATED_PASSWORD_SUCCESS;
    payload: string;
};

export type UserUpdatedPasswordFailureActionType = {
    type: typeof USER_UPDATED_PASSWORD_FAILURE;
    payload: AuthErrors;
};

export type UserAddedReviewSuccessActionType = {
    type: typeof USER_ADDED_REVIEW_SUCCESS;
};

export type UserAddedReviewFailureActionType = {
    type: typeof USER_ADDED_REVIEW_FAILURE;
    payload: ReviewError;
};

export type ResetInputFormActionType = {
    type: typeof RESET_INPUT_FORM;
};

export type LogoutSuccessActionType = {
    type: typeof LOGOUT_SUCCESS;
};

export type UserActionTypes =
    | SetUserLoadingStateActionType
    | SetUpdatedUserActionType
    | SetUserActionType
    | UserUpdatedFailureActionType
    | UserUpdatedPasswordSuccessActionType
    | UserUpdatedPasswordFailureActionType
    | UserAddedReviewSuccessActionType
    | UserAddedReviewFailureActionType
    | ResetInputFormActionType
    | LogoutSuccessActionType;
