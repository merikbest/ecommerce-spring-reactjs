import { Perfume } from "../../types/types";

export const LOADING_PERFUME = "perfumes/LOADING_PERFUME";
export const SET_PERFUMES = "perfumes/SET_PERFUMES";
export const REMOVE_PERFUME_BY_ID = "perfumes/REMOVE_PERFUME_BY_ID";
export const RESET_PERFUMES_STATE = "perfumes/RESET_PERFUMES_STATE";

export type LoadingPerfumeActionType = {
    type: typeof LOADING_PERFUME;
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
    | LoadingPerfumeActionType
    | SetPerfumesActionType
    | RemovePerfumeByIdActionType
    | ResetPerfumesStateActionType;
