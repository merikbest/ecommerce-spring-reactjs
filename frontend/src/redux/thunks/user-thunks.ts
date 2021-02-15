import axios from 'axios';
import {API_BASE_URL} from "../../utils/constants/url";
import {userAddedReviewFailure, userAddedReviewSuccess, userUpdatedSuccess} from "../actions/user-actions";

export const updateUserInfo = (userData: any, history: any) => async (dispatch: any) => {
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

export const addReviewToPerfume = (data: any) => async (dispatch: any) => {
    try {
        await axios.post(API_BASE_URL + "/user/review", data);
        dispatch(userAddedReviewSuccess());
        window.location.reload();
    } catch (error) {
        dispatch(userAddedReviewFailure(error.response.data));
    }
};
