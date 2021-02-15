import {ReviewError} from "../../types/types";
import {
    USER_ADDED_REVIEW_FAILURE,
    USER_ADDED_REVIEW_SUCCESS,
    USER_UPDATED_SUCCESS,
    UserAddedReviewFailureActionType,
    UserAddedReviewSuccessActionType,
    UserUpdatedSuccessActionType
} from "../action-types/user-actions-types";

export const userUpdatedSuccess = (): UserUpdatedSuccessActionType => ({
    type: USER_UPDATED_SUCCESS
});

export const userAddedReviewSuccess = (): UserAddedReviewSuccessActionType => ({
    type: USER_ADDED_REVIEW_SUCCESS
});

export const userAddedReviewFailure = (errors: ReviewError): UserAddedReviewFailureActionType => ({
    type: USER_ADDED_REVIEW_FAILURE,
    payload: errors
});
