import { Perfume } from "../../types/types";
import {
    LOADING_PERFUME,
    LoadingPerfumeActionType,
    RESET_PERFUME_STATE,
    ResetPerfumeStateActionType,
    SET_PERFUME,
    SET_PERFUME_BY_QUERY,
    SetPerfumeActionType,
    SetPerfumeByQueryActionType
} from "./perfume-action-types";

export const loadingPerfume = (): LoadingPerfumeActionType => ({
    type: LOADING_PERFUME
});

export const setPerfume = (perfume: Perfume): SetPerfumeActionType => ({
    type: SET_PERFUME,
    payload: perfume
});

export const setPerfumeByQuery = (perfume: Perfume): SetPerfumeByQueryActionType => ({
    type: SET_PERFUME_BY_QUERY,
    payload: perfume
});

export const resetPerfumeState = (): ResetPerfumeStateActionType => ({
    type: RESET_PERFUME_STATE
});
