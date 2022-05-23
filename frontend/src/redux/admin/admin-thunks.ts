import { Dispatch } from "redux";

import {
    addPerfumeFailure,
    addPerfumeSuccess,
    deletePerfumeSuccess,
    setAdminLoadingState,
    setAllUsers,
    setUserInfo,
    updatePerfumeFailure,
    updatePerfumeSuccess
} from "./admin-actions";
import { removePerfumeById } from "../perfumes/perfumes-actions";
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
import { LoadingStatus } from "../../types/types";

export const addPerfume = (data: FormData) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAdminLoadingState(LoadingStatus.LOADING));
        await RequestService.post(ADMIN_ADD, data, true, "multipart/form-data");
        dispatch(addPerfumeSuccess());
    } catch (error) {
        dispatch(addPerfumeFailure(error.response.data));
    }
};

export const updatePerfume = (data: FormData) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAdminLoadingState(LoadingStatus.LOADING));
        const response = await RequestService.post(ADMIN_EDIT, data, true, "multipart/form-data");
        dispatch(updatePerfumeSuccess());
        dispatch(setPerfume(response.data));
    } catch (error) {
        dispatch(updatePerfumeFailure(error.response.data));
    }
};

export const deletePerfume = (perfumeId: number) => async (dispatch: Dispatch) => {
    await RequestService.delete(`${ADMIN_DELETE}/${perfumeId}`, true);
    dispatch(deletePerfumeSuccess());
    dispatch(removePerfumeById(perfumeId));
};

export const fetchAllUsers = () => async (dispatch: Dispatch) => {
    dispatch(setAdminLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.get(ADMIN_USER_ALL, true);
    dispatch(setAllUsers(response.data));
};

export const fetchUserInfo = (userId: string) => async (dispatch: Dispatch) => {
    dispatch(setAdminLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.get(`${ADMIN_USER}/${userId}`, true);
    dispatch(setUserInfo(response.data));
};

//GraphQL thunks
export const fetchUserInfoByQuery = (userId: string) => async (dispatch: Dispatch) => {
    dispatch(setAdminLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.post(ADMIN_GRAPHQL_USER, { query: userByQuery(userId) }, true);
    dispatch(setUserInfo(response.data.data.user));
};

export const fetchAllUsersByQuery = () => async (dispatch: Dispatch) => {
    dispatch(setAdminLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.post(ADMIN_GRAPHQL_USER_ALL, { query: usersByQuery }, true);
    dispatch(setAllUsers(response.data.data.users));
};
