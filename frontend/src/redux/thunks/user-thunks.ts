import axios from 'axios';
import {API_BASE_URL} from "../../utils/constants/url";
import {userAddedReviewFailure, userAddedReviewSuccess, userUpdatedSuccess} from "../actions/user-actions";
import {ReviewData, UserData} from "../../types/types";
import {Dispatch} from "redux";

export const updateUserInfo = (userData: UserData, history: any) => async (dispatch: Dispatch) => {
    axios({
        method: "PUT",
        url: API_BASE_URL + "/user/edit",
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
        await axios.post(API_BASE_URL + "/user/review", review);
        dispatch(userAddedReviewSuccess());
        window.location.reload();
    } catch (error) {
        dispatch(userAddedReviewFailure(error.response.data));
    }
};
