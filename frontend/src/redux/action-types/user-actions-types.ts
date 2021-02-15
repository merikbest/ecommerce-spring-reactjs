import {ReviewError} from "../../types/types";

export const USER_UPDATED_SUCCESS = "USER_UPDATED_SUCCESS";
export const USER_ADDED_REVIEW_SUCCESS = "USER_ADDED_REVIEW_SUCCESS";
export const USER_ADDED_REVIEW_FAILURE = "USER_ADDED_REVIEW_FAILURE";

export type UserUpdatedSuccessActionType = { type: typeof USER_UPDATED_SUCCESS };
export type UserAddedReviewSuccessActionType = { type: typeof USER_ADDED_REVIEW_SUCCESS };
export type UserAddedReviewFailureActionType = { type: typeof USER_ADDED_REVIEW_FAILURE, payload: ReviewError };

export type UserActionsTypes = UserUpdatedSuccessActionType | UserAddedReviewSuccessActionType |
    UserAddedReviewFailureActionType;
