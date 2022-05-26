import { LoadingStatus, Perfume, Review } from "../../types/types";
import { RootState } from "../../store-rtk";
import { PerfumeState } from "./perfume-slice";

export const selectPerfumeState = (state: RootState): PerfumeState => state.perfume;
export const selectPerfume = (state: RootState): Partial<Perfume> => state.perfume.perfume;
export const selectReviews = (state: RootState): Array<Review> => state.perfume.reviews;
export const selectPerfumeErrorMessage = (state: RootState): string => state.perfume.errorMessage;

export const selectLoadingStatus = (state: RootState): LoadingStatus => selectPerfumeState(state).loadingState;
export const selectIsPerfumeLoading = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.LOADING;
export const selectIsPerfumeLoaded = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.LOADED;
export const selectPerfumeError = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.ERROR;
