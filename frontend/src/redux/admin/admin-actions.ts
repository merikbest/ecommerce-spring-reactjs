import { LoadingStatus, PerfumeErrors, User } from "../../types/types";
import {
    AddPerfumeFailureActionType,
    AddPerfumeSuccessActionType,
    DeletePerfumeSuccessActionType,
    PERFUME_ADDED_FAILURE,
    PERFUME_ADDED_SUCCESS,
    PERFUME_DELETED_SUCCESS,
    PERFUME_UPDATED_FAILURE,
    PERFUME_UPDATED_SUCCESS,
    RESET_ADMIN_STATE,
    ResetAdminStateActionType,
    SET_ADMIN_LOADING_STATE,
    SET_ALL_USERS,
    SET_USER_INFO,
    SetAdminLoadingStateActionType,
    SetAllUsersActionType,
    SetUserInfoActionType,
    UpdatePerfumeFailureActionType,
    UpdatePerfumeSuccessActionType
} from "./admin-action-types";

export const setAdminLoadingState = (status: LoadingStatus): SetAdminLoadingStateActionType => ({
    type: SET_ADMIN_LOADING_STATE,
    payload: status
});

export const addPerfumeSuccess = (): AddPerfumeSuccessActionType => ({
    type: PERFUME_ADDED_SUCCESS
});

export const addPerfumeFailure = (error: PerfumeErrors): AddPerfumeFailureActionType => ({
    type: PERFUME_ADDED_FAILURE,
    payload: error
});

export const updatePerfumeSuccess = (): UpdatePerfumeSuccessActionType => ({
    type: PERFUME_UPDATED_SUCCESS
});

export const updatePerfumeFailure = (error: PerfumeErrors): UpdatePerfumeFailureActionType => ({
    type: PERFUME_UPDATED_FAILURE,
    payload: error
});

export const deletePerfumeSuccess = (): DeletePerfumeSuccessActionType => ({
    type: PERFUME_DELETED_SUCCESS
});

export const setAllUsers = (users: Array<User>): SetAllUsersActionType => ({
    type: SET_ALL_USERS,
    payload: users
});

export const setUserInfo = (user: User): SetUserInfoActionType => ({
    type: SET_USER_INFO,
    payload: user
});

export const resetAdminState = (): ResetAdminStateActionType => ({
    type: RESET_ADMIN_STATE
});
