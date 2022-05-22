import { LoadingStatus, Perfume } from "../../types/types";
import {
    REMOVE_PERFUME_BY_ID,
    RemovePerfumeByIdActionType,
    RESET_PERFUMES_STATE,
    ResetPerfumesStateActionType,
    SET_PERFUMES,
    SET_PERFUMES_LOADING_STATE,
    SetPerfumesActionType,
    SetPerfumesLoadingStateActionType
} from "./perfumes-action-types";

export const setPerfumesLoadingState = (status: LoadingStatus): SetPerfumesLoadingStateActionType => ({
    type: SET_PERFUMES_LOADING_STATE,
    payload: status
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
