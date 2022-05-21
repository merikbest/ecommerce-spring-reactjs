import { Dispatch } from "redux";

import {
    addPerfumeFailure,
    addPerfumeSuccess,
    getAllUsers,
    getAllUsersByQuery,
    getUserInfo,
    getUserInfoByQuery,
    loadingData,
    updatePerfumeFailure,
    updatePerfumeSuccess
} from "./admin-actions";
import { setPerfumes } from "../perfumes/perfumes-actions";
import RequestService from "../../utils/request-service";
import { userByQuery, usersByQuery } from "../../utils/graphql-query/users-query";
import { setPerfume } from "../perfume/perfume-actions";
import {
    ADMIN_ADD,
    ADMIN_DELETE,
    ADMIN_EDIT,
    ADMIN_GRAPHQL_USER,
    ADMIN_GRAPHQL_USER_ALL,
    ADMIN_USER,
    ADMIN_USER_ALL
} from "../../constants/urlConstants";

export const addPerfume = (data: FormData) => async (dispatch: Dispatch) => {
    try {
        await RequestService.post(ADMIN_ADD, data, true, "multipart/form-data");
        dispatch(addPerfumeSuccess());
    } catch (error) {
        dispatch(addPerfumeFailure(error.response.data));
    }
};

export const updatePerfume = (data: FormData) => async (dispatch: Dispatch) => {
    try {
        const response = await RequestService.post(ADMIN_EDIT, data, true, "multipart/form-data");
        dispatch(updatePerfumeSuccess());
        dispatch(setPerfume(response.data));
    } catch (error) {
        dispatch(updatePerfumeFailure(error.response.data));
    }
};

export const deletePerfume = (id?: number) => async (dispatch: Dispatch) => {
    const response = await RequestService.delete(`${ADMIN_DELETE}/${id}`, true);
    dispatch(setPerfumes(response.data));
};

export const fetchAllUsers = () => async (dispatch: Dispatch) => {
    dispatch(loadingData());
    const response = await RequestService.get(ADMIN_USER_ALL, true);
    dispatch(getAllUsers(response.data));
};

export const fetchUserInfo = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingData());
    const response = await RequestService.get(`${ADMIN_USER}/${id}`, true);
    dispatch(getUserInfo(response.data));
};

//GraphQL thunks
export const fetchUserInfoByQuery = (id: string) => async (dispatch: Dispatch) => {
    dispatch(loadingData());
    const response = await RequestService.post(ADMIN_GRAPHQL_USER, { query: userByQuery(id) }, true);
    dispatch(getUserInfoByQuery(response.data.data.user));
};

export const fetchAllUsersByQuery = () => async (dispatch: Dispatch) => {
    dispatch(loadingData());
    const response = await RequestService.post(ADMIN_GRAPHQL_USER_ALL, { query: usersByQuery }, true);
    dispatch(getAllUsersByQuery(response.data.data.users));
};
