import { Perfume } from "../../types/types";

export const LOADING_PERFUME = "perfume/LOADING_PERFUME";
export const SET_PERFUME = "perfume/SET_PERFUME";
export const SET_PERFUME_BY_QUERY = "perfume/SET_PERFUME_BY_QUERY";
export const RESET_PERFUME_STATE = "perfume/RESET_PERFUME_STATE";

export type LoadingPerfumeActionType = {
    type: typeof LOADING_PERFUME;
};

export type SetPerfumeActionType = {
    type: typeof SET_PERFUME;
    payload: Perfume;
};

export type SetPerfumeByQueryActionType = {
    type: typeof SET_PERFUME_BY_QUERY;
    payload: Perfume;
};

export type ResetPerfumeStateActionType = {
    type: typeof RESET_PERFUME_STATE;
};

export type PerfumeActionTypes =
    | LoadingPerfumeActionType
    | SetPerfumeActionType
    | SetPerfumeByQueryActionType
    | ResetPerfumeStateActionType;
