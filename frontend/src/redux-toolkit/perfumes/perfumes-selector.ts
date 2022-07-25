import { PerfumesState } from "./perfumes-slice";
import { LoadingStatus, PerfumeResponse } from "../../types/types";
import { RootState } from "../../store";

export const selectPerfumesState = (state: RootState): PerfumesState => state.perfumes;
export const selectPerfumes = (state: RootState): Array<PerfumeResponse> => selectPerfumesState(state).perfumes;
export const selectPagesCount = (state: RootState): number => selectPerfumesState(state).pagesCount;
export const selectTotalElements = (state: RootState): number => selectPerfumesState(state).totalElements;
export const selectIsPerfumesLoading = (state: RootState): boolean => selectPerfumesState(state).loadingState === LoadingStatus.LOADING;
