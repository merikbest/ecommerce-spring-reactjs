import {Dispatch} from "redux";

import {
    loadingUserInfo,
    setUser,
    userAddedReviewFailure,
    userAddedReviewSuccess,
    userUpdatedFailure,
    userUpdatedPasswordFailure,
    userUpdatedPasswordSuccess,
    setUpdatedUser
} from "./user-actions";
import {ReviewData, UserEdit, UserResetPasswordData} from "../../types/types";
import RequestService from '../../utils/request-service';
import {userByQuery} from "../../utils/graphql-query/users-query";
import {setPerfume} from "../perfume/perfume-actions";

export const fetchUserInfo = () => async (dispatch: Dispatch) => {
    dispatch(loadingUserInfo());
    const response = await RequestService.get("/users/info", true);
    localStorage.setItem("email", response.data.email);
    localStorage.setItem("userRole", response.data.roles);
    localStorage.setItem("isLoggedIn", "true");
    dispatch(setUser(response.data));
};

export const updateUserInfo = (userEdit: UserEdit) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.put("/users/edit", userEdit, true);
        dispatch(setUpdatedUser(response.data));
    } catch (error) {
        dispatch(userUpdatedFailure(error.response.data));
    }
};

export const updateUserPassword = (data: UserResetPasswordData) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.put("/auth/edit/password", data, true);
        dispatch(userUpdatedPasswordSuccess(response.data));
    } catch (error) {
        dispatch(userUpdatedPasswordFailure(error.response.data));
    }
};

export const addReviewToPerfume = (review: ReviewData) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.post("/users/review", review);
        dispatch(setPerfume(response.data));
        dispatch(userAddedReviewSuccess());
    } catch (error) {
        dispatch(userAddedReviewFailure(error.response.data));
    }
};

// GraphQL query
export const fetchUserInfoByQuery = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingUserInfo());
    const response = await RequestService.post("/users/graphql/info", {query: userByQuery(id)}, true);
    localStorage.setItem("email", response.data.data.user.email);
    localStorage.setItem("userRole", response.data.data.user.roles);
    localStorage.setItem("isLoggedIn", "true");
    dispatch(setUser(response.data.data.user));
};
