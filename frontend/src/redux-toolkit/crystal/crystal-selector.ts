import { FullCrystalResponse, LoadingStatus, ReviewResponse } from "../../types/types";
import { RootState } from "../../store";
import { CrystalState } from "./crystal-slice";

export const selectCrystalState = (state: RootState): CrystalState => state.crystal;
export const selectCrystal = (state: RootState): Partial<FullCrystalResponse> => state.crystal.crystal;
export const selectReviews = (state: RootState): Array<ReviewResponse> => state.perfume.reviews;
export const selectCrystalErrorMessage = (state: RootState): string => state.perfume.errorMessage;

export const selectLoadingStatus = (state: RootState): LoadingStatus => selectCrystalState(state).loadingState;
export const selectIsCrystalLoading = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.LOADING;
export const selectIsCrystalLoaded = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.LOADED;
export const selectCrystalError = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.ERROR;
