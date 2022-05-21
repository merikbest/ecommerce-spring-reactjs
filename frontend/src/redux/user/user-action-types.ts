import { AuthErrors, ReviewError, User, UserEditErrors } from "../../types/types";
import { LogoutSuccessActionType } from "../auth/auth-action-types";

export const LOADING_USER_INFO = "user/LOADING_USER_INFO";
export const SET_USER = "user/SET_USER";
export const SET_UPDATED_USER = "user/SET_UPDATED_USER";
export const USER_UPDATED_FAILURE = "user/USER_UPDATED_FAILURE";
export const USER_UPDATED_PASSWORD_SUCCESS = "user/USER_UPDATED_PASSWORD_SUCCESS";
export const USER_UPDATED_PASSWORD_FAILURE = "user/USER_UPDATED_PASSWORD_FAILURE";
export const USER_ADDED_REVIEW_SUCCESS = "user/USER_ADDED_REVIEW_SUCCESS";
export const USER_ADDED_REVIEW_FAILURE = "user/USER_ADDED_REVIEW_FAILURE";
export const RESET_INPUT_FORM = "user/RESET_INPUT_FORM";

export type LoadingUserInfoActionType = {
    type: typeof LOADING_USER_INFO;
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

export type UserActionTypes =
    | LoadingUserInfoActionType
    | SetUpdatedUserActionType
    | SetUserActionType
    | UserUpdatedFailureActionType
    | UserUpdatedPasswordSuccessActionType
    | UserUpdatedPasswordFailureActionType
    | UserAddedReviewSuccessActionType
    | UserAddedReviewFailureActionType
    | ResetInputFormActionType
    | LogoutSuccessActionType;
