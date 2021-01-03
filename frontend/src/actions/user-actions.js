import axios from 'axios';

import {
    USER_UPDATED_SUCCESS,
    USER_ADDED_REVIEW_SUCCESS,
    USER_ADDED_REVIEW_FAILURE
} from "../utils/constants/actions-types";
import {API_BASE_URL} from "../utils/constants/url";

export const updateUserInfo = (userData, history) => async (dispatch) => {
    axios({
        method: "PUT",
        url: API_BASE_URL + "/user/edit",
        data: userData,
        headers: {
            "Content-Type" : "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });

    dispatch({
        type: USER_UPDATED_SUCCESS
    })

    history.push("/account");
};

export const addReviewToPerfume = (data) => async (dispatch) => {
    try {
        await axios.post(API_BASE_URL + "/user/review", data);

        dispatch({
            type: USER_ADDED_REVIEW_SUCCESS
        })

        window.location.reload();
    } catch (error) {
        dispatch({
            type: USER_ADDED_REVIEW_FAILURE,
            payload: error.response.data
        })
    }
};
