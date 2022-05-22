import { AppStateType } from "../root-reducer";
import { PerfumeState } from "./perfume-reducer";
import { LoadingStatus, Perfume, Review } from "../../types/types";

export const selectPerfumeState = (state: AppStateType): PerfumeState => state.perfume;
export const selectPerfume = (state: AppStateType): Partial<Perfume> => state.perfume.perfume;
export const selectReviews = (state: AppStateType): Array<Review> => state.perfume.reviews;
export const selectPerfumeErrorMessage = (state: AppStateType): string => state.perfume.errorMessage;

export const selectLoadingStatus = (state: AppStateType): LoadingStatus => selectPerfumeState(state).loadingState;
export const selectIsPerfumeLoading = (state: AppStateType): boolean => selectLoadingStatus(state) === LoadingStatus.LOADING;
export const selectIsPerfumeLoaded = (state: AppStateType): boolean => selectLoadingStatus(state) === LoadingStatus.LOADED;
export const selectPerfumeError = (state: AppStateType): boolean => selectLoadingStatus(state) === LoadingStatus.ERROR;
