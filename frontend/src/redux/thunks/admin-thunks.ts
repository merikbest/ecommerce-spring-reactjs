import {Dispatch} from "redux";

import {
    addPerfumeFailure,
    addPerfumeSuccess,
    getAllUsers,
    getAllUsersOrders,
    getUserInfo,
    getUserOrders,
    reset,
    updatePerfumeFailure,
    updatePerfumeSuccess
} from "../actions/admin-actions";
import {fetchPerfumeSuccess, getPerfumes} from "../actions/perfume-actions";
import RequestService from '../../utils/request-service';

export const addPerfume = (data: FormData) => async (dispatch: Dispatch) => {
    try {
        await RequestService.post("/admin/add", data, true, "multipart/form-data")
        dispatch(addPerfumeSuccess());
    } catch (error) {
        dispatch(addPerfumeFailure(error.response.data));
    }
};

export const updatePerfume = (data: FormData) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.put("/admin/edit", data, true, "multipart/form-data");
        dispatch(updatePerfumeSuccess());
        dispatch(fetchPerfumeSuccess(response.data));
    } catch (error) {
        dispatch(updatePerfumeFailure(error.response.data));
    }
};

export const deletePerfume = (id?: number) => async (dispatch: Dispatch) => {
    const response = await RequestService.delete("/admin/delete/" + id, true);
    dispatch(getPerfumes(response.data));
};

export const fetchAllUsersOrders = () => async (dispatch: Dispatch) => {
    const response = await RequestService.get("/admin/orders", true);
    dispatch(getAllUsersOrders(response.data));
};

export const fetchUserOrders = (email: string | undefined) => async (dispatch: Dispatch) => {
    const response = await RequestService.post("/admin/order", {email: email}, true);
    dispatch(getUserOrders(response.data));
};

export const fetchAllUsers = () => async (dispatch: Dispatch) => {
    const response = await RequestService.get("/admin/user/all", true);
    dispatch(getAllUsers(response.data));
};

export const fetchUserInfo = (id: string) => async (dispatch: Dispatch) => {
    const response = await RequestService.get("/admin/user/" + id, true);
    dispatch(getUserInfo(response.data));
};

export const formReset = () => async (dispatch: Dispatch) => {
    dispatch(reset());
};
