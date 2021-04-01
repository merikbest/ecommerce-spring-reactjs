import axios from 'axios';
import {Dispatch} from "redux";

import {API_BASE_URL} from "../../utils/constants/url";
import {userAddedReviewFailure, userAddedReviewSuccess, userUpdatedSuccess} from "../actions/user-actions";
import {fetchAccountSuccess} from '../actions/auth-actions';
import {ReviewData, UserData} from "../../types/types";

export const fetchUserInfo = () => async (dispatch: Dispatch) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/users/info",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    }).then(response => {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userRole", response.data.roles);
        localStorage.setItem("isLoggedIn", "true");
        dispatch(fetchAccountSuccess(response.data));
    });
};

export const updateUserInfo = (userData: UserData, history: any) => async (dispatch: Dispatch) => {
    axios({
        method: "PUT",
        url: API_BASE_URL + "/users/edit",
        data: userData,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });
    dispatch(userUpdatedSuccess());
    history.push("/account");
};

export const addReviewToPerfume = (review: ReviewData) => async (dispatch: Dispatch) => {
    try {
        await axios.post(API_BASE_URL + "/users/review", review);
        dispatch(userAddedReviewSuccess());
        window.location.reload();
    } catch (error) {
        dispatch(userAddedReviewFailure(error.response.data));
    }
};
