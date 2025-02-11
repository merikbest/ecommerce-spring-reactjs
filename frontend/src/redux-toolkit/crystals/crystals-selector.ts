import { CrystalsState } from "./crystals-slice";
import { CrystalResponse, LoadingStatus } from "../../types/types";
import { RootState } from "../../store";

export const selectCrystalsState = (state: RootState): CrystalsState => state.crystals;
export const selectCrystals = (state: RootState): Array<CrystalResponse> => selectCrystalsState(state).crystals;

export const selectPagesCount = (state: RootState): number => selectCrystalsState(state).pagesCount;
export const selectTotalElements = (state: RootState): number => selectCrystalsState(state).totalElements;
export const selectIsPerfumesLoading = (state: RootState): boolean => selectCrystalsState(state).loadingState === LoadingStatus.LOADING;
