import { Perfume } from "../../types/types";
import {
    LOADING_PERFUME,
    LoadingPerfumeActionType,
    REMOVE_PERFUME_BY_ID,
    RemovePerfumeByIdActionType,
    RESET_PERFUMES_STATE,
    ResetPerfumesStateActionType,
    SET_PERFUMES,
    SetPerfumesActionType
} from "./perfumes-action-types";

export const loadingPerfume = (): LoadingPerfumeActionType => ({
    type: LOADING_PERFUME
});

export const setPerfumes = (perfumes: Array<Perfume>): SetPerfumesActionType => ({
    type: SET_PERFUMES,
    payload: perfumes
});

export const removePerfumeById = (perfumeId: number): RemovePerfumeByIdActionType => ({
    type: REMOVE_PERFUME_BY_ID,
    payload: perfumeId
});

export const resetPerfumesState = (): ResetPerfumesStateActionType => ({
    type: RESET_PERFUMES_STATE
});
