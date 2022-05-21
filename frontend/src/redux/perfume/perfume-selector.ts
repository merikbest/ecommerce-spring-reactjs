import { AppStateType } from "../root-reducer";
import { PerfumeState } from "./perfume-reducer";
import { Perfume, Review } from "../../types/types";

export const selectPerfumeState = (state: AppStateType): PerfumeState => state.perfume;
export const selectPerfume = (state: AppStateType): Partial<Perfume> => state.perfume.perfume;
export const selectReviews = (state: AppStateType): Array<Review> => state.perfume.reviews;
export const selectIsPerfumeLoading = (state: AppStateType): boolean => selectPerfumeState(state).isPerfumeLoading;
