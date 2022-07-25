import { FullPerfumeResponse, LoadingStatus, ReviewResponse } from "../../types/types";
import { RootState } from "../../store";
import { PerfumeState } from "./perfume-slice";

export const selectPerfumeState = (state: RootState): PerfumeState => state.perfume;
export const selectPerfume = (state: RootState): Partial<FullPerfumeResponse> => state.perfume.perfume;
export const selectReviews = (state: RootState): Array<ReviewResponse> => state.perfume.reviews;
export const selectPerfumeErrorMessage = (state: RootState): string => state.perfume.errorMessage;

export const selectLoadingStatus = (state: RootState): LoadingStatus => selectPerfumeState(state).loadingState;
export const selectIsPerfumeLoading = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.LOADING;
export const selectIsPerfumeLoaded = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.LOADED;
export const selectPerfumeError = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.ERROR;
