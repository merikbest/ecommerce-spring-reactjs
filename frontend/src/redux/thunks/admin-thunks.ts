import axios from 'axios';

import {API_BASE_URL} from "../../utils/constants/url";
import {Perfume} from "../../types/types";
import {
    addPerfumeFailure,
    addPerfumeSuccess,
    getAllUsers,
    getAllUsersOrders,
    getPerfumes,
    getUser, reset,
    updatePerfumeFailure,
    updatePerfumeSuccess
} from "../actions/admin-actions";

export const addPerfume = (data: FormData) => async (dispatch: any) => {
    try {
        await axios({
            method: "POST",
            url: API_BASE_URL + "/admin/add",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": localStorage.getItem("token")
            }
        });
        window.scrollTo(0, 0);
        dispatch(addPerfumeSuccess());
    } catch (error) {
        dispatch(addPerfumeFailure(error.response.data));
    }
};

export const fetchPerfumes = () => async (dispatch: any) => {
    const response = await axios.get(API_BASE_URL + "/home");
    dispatch(getPerfumes(response.data));
};

export const updatePerfume = (data: Perfume, history: any) => async (dispatch: any) => {
    try {
        const response = await axios({
            method: "PUT",
            url: API_BASE_URL + "/admin/edit",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": localStorage.getItem("token")
            }
        });
        history.push("/account");
        dispatch(updatePerfumeSuccess(response.data));
    } catch (error) {
        dispatch(updatePerfumeFailure(error.response.data));
    }
};

export const fetchAllUsersOrders = () => async (dispatch: any) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/admin/orders",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });
    dispatch(getAllUsersOrders(response.data));
};

export const fetchAllUsers = () => async (dispatch: any) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/admin/user/all",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });
    dispatch(getAllUsers(response.data));
};

export const fetchUser = (id: number) => async (dispatch: any) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/admin/user/" + id,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });
    dispatch(getUser(response.data));
};

export const formReset = () => async (dispatch: any) => {
    dispatch(reset());
};
