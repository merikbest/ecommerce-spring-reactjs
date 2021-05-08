import {Dispatch} from "redux";

import {fetchPerfumeSuccess} from '../actions/perfume-actions';
import {
    fetchUserSuccess,
    resetInputForm,
    userAddedReviewFailure,
    userAddedReviewSuccess,
    userUpdatedFailure,
    userUpdatedPasswordFailure,
    userUpdatedPasswordSuccess,
    userUpdatedSuccess
} from "../actions/user-actions";
import {ReviewData, UserEdit, UserResetPasswordData} from "../../types/types";
import RequestService from '../../utils/request-service';

export const fetchUserInfo = () => async (dispatch: Dispatch) => {
    const response = await RequestService.get("/users/info", true);
    localStorage.setItem("email", response.data.email);
    localStorage.setItem("userRole", response.data.roles);
    localStorage.setItem("isLoggedIn", "true");
    dispatch(fetchUserSuccess(response.data));
};

export const updateUserInfo = (userEdit: UserEdit) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.put("/users/edit", userEdit, true);
        dispatch(userUpdatedSuccess(response.data));
    } catch (error) {
        dispatch(userUpdatedFailure(error.response.data));
    }
};

export const updateUserPassword = (data: UserResetPasswordData) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.put("/users/edit/password", data, true);
        dispatch(userUpdatedPasswordSuccess(response.data));
    } catch (error) {
        dispatch(userUpdatedPasswordFailure(error.response.data));
    }
};

export const addReviewToPerfume = (review: ReviewData) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.post("/users/review", review);
        dispatch(fetchPerfumeSuccess(response.data));
        dispatch(userAddedReviewSuccess());
    } catch (error) {
        dispatch(userAddedReviewFailure(error.response.data));
    }
};

export const resetForm = () => (dispatch: Dispatch) => {
    dispatch(resetInputForm());
};
