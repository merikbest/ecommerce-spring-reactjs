import { PerfumesState } from "./perfumes-slice";
import { LoadingStatus, Perfume } from "../../types/types";
import { RootState } from "../../store-rtk";

export const selectPerfumesState = (state: RootState): PerfumesState => state.perfumes;
export const selectPerfumes = (state: RootState): Array<Perfume> => selectPerfumesState(state).perfumes;
export const selectIsPerfumesLoading = (state: RootState): boolean => selectPerfumesState(state).loadingState === LoadingStatus.LOADING;
