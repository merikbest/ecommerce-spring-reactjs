import { Dispatch } from "redux";

import {
    setUpdatedUser,
    setUser,
    setUserLoadingState,
    userAddedReviewFailure,
    userAddedReviewSuccess,
    userUpdatedFailure,
    userUpdatedPasswordFailure,
    userUpdatedPasswordSuccess
} from "./user-actions";
import { LoadingStatus, ReviewRequest, UserEditRequest, UserResetPasswordRequest } from "../../types/types";
import RequestService from "../../utils/request-service";
import { userByQuery } from "../../utils/graphql-query/users-query";
import {
    AUTH_EDIT_PASSWORD,
    USERS_EDIT,
    USERS_GRAPHQL_INFO,
    USERS_INFO,
    USERS_REVIEW
} from "../../constants/urlConstants";

export const fetchUserInfo = () => async (dispatch: Dispatch) => {
    dispatch(setUserLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.get(USERS_INFO, true);
    dispatch(setUser(response.data));
};

export const updateUserInfo = (request: UserEditRequest) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.put(USERS_EDIT, request, true);
        dispatch(setUpdatedUser(response.data));
    } catch (error) {
        dispatch(userUpdatedFailure(error.response.data));
    }
};

export const updateUserPassword = (request: UserResetPasswordRequest) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.put(AUTH_EDIT_PASSWORD, request, true);
        dispatch(userUpdatedPasswordSuccess(response.data));
    } catch (error) {
        dispatch(userUpdatedPasswordFailure(error.response.data));
    }
};

export const addReviewToPerfume = (request: ReviewRequest) => async (dispatch: Dispatch) => {
    try {
        await RequestService.post(USERS_REVIEW, request);
        dispatch(userAddedReviewSuccess());
    } catch (error) {
        dispatch(userAddedReviewFailure(error.response.data));
    }
};

// GraphQL query
export const fetchUserInfoByQuery = (userId: string) => async (dispatch: Dispatch) => {
    dispatch(setUserLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.post(USERS_GRAPHQL_INFO, { query: userByQuery(userId) }, true);
    dispatch(setUser(response.data.data.user));
};
