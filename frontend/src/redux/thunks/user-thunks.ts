import axios from 'axios';
import {Dispatch} from "redux";

import {API_BASE_URL} from "../../utils/constants/url";
import {fetchPerfumeReviewsSuccess} from '../actions/perfume-actions';
import {
    fetchUserSuccess,
    resetInputForm,
    userAddedReviewFailure,
    userUpdatedFailure,
    userUpdatedPasswordFailure,
    userUpdatedPasswordSuccess,
    userUpdatedSuccess
} from "../actions/user-actions";
import {ReviewData, UserEdit, UserResetPasswordData} from "../../types/types";

export const fetchUserInfo = () => async (dispatch: Dispatch) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/users/info",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });
    localStorage.setItem("email", response.data.email);
    localStorage.setItem("userRole", response.data.roles);
    localStorage.setItem("isLoggedIn", "true");
    dispatch(fetchUserSuccess(response.data));
};

export const updateUserInfo = (userEdit: UserEdit) => async (dispatch: Dispatch) => {
    try {
        const response = await axios({
            method: "PUT",
            url: API_BASE_URL + "/users/edit",
            data: userEdit,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
        dispatch(userUpdatedSuccess(response.data));
    } catch (error) {
        dispatch(userUpdatedFailure(error.response.data));
    }
};

export const updateUserPassword = (data: UserResetPasswordData) => async (dispatch: Dispatch) => {
    try {
        const response = await axios({
            method: "PUT",
            url: API_BASE_URL + "/users/edit/password",
            data: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
        dispatch(userUpdatedPasswordSuccess(response.data));
    } catch (error) {
        dispatch(userUpdatedPasswordFailure(error.response.data));
    }
};

export const addReviewToPerfume = (review: ReviewData) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.post(API_BASE_URL + "/users/review", review);
        dispatch(fetchPerfumeReviewsSuccess(response.data));
    } catch (error) {
        dispatch(userAddedReviewFailure(error.response.data));
    }
};

export const resetForm = () => (dispatch: Dispatch) => {
    dispatch(resetInputForm());
};
