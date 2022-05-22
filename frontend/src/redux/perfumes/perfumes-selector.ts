import { AppStateType } from "../root-reducer";
import { PerfumesState } from "./perfumes-reducer";
import { LoadingStatus, Perfume } from "../../types/types";

export const selectPerfumesState = (state: AppStateType): PerfumesState => state.perfumes;
export const selectPerfumes = (state: AppStateType): Array<Perfume> => selectPerfumesState(state).perfumes;
export const selectIsPerfumesLoading = (state: AppStateType): boolean => selectPerfumesState(state).loadingState === LoadingStatus.LOADING;
