import {LoadingStatus, Perfume} from "../../types/types";

export const SET_PERFUMES_LOADING_STATE = "perfumes/SET_PERFUMES_LOADING_STATE";
export const SET_PERFUMES = "perfumes/SET_PERFUMES";
export const REMOVE_PERFUME_BY_ID = "perfumes/REMOVE_PERFUME_BY_ID";
export const RESET_PERFUMES_STATE = "perfumes/RESET_PERFUMES_STATE";

export type SetPerfumesLoadingStateActionType = {
    type: typeof SET_PERFUMES_LOADING_STATE;
    payload: LoadingStatus;
};

export type SetPerfumesActionType = {
    type: typeof SET_PERFUMES;
    payload: Array<Perfume>;
};

export type RemovePerfumeByIdActionType = {
    type: typeof REMOVE_PERFUME_BY_ID;
    payload: number;
};

export type ResetPerfumesStateActionType = {
    type: typeof RESET_PERFUMES_STATE;
};

export type PerfumesActionTypes =
    | SetPerfumesLoadingStateActionType
    | SetPerfumesActionType
    | RemovePerfumeByIdActionType
    | ResetPerfumesStateActionType;
