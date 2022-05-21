import { Perfume } from "../../types/types";
import {
    LOADING_PERFUME,
    PerfumesActionTypes,
    REMOVE_PERFUME_BY_ID,
    RESET_PERFUMES_STATE,
    SET_PERFUMES
} from "./perfumes-action-types";

export type PerfumesState = {
    perfumes: Array<Perfume>;
    isPerfumeLoading: boolean;
};

const initialState: PerfumesState = {
    perfumes: [],
    isPerfumeLoading: true
};

const perfumesReducer = (state: PerfumesState = initialState, action: PerfumesActionTypes): PerfumesState => {
    switch (action.type) {
        case LOADING_PERFUME:
            return { ...state, isPerfumeLoading: true };

        case SET_PERFUMES:
            return { ...state, perfumes: action.payload, isPerfumeLoading: false };

        case REMOVE_PERFUME_BY_ID:
            const perfumes = state.perfumes.filter((perfume) => perfume.id !== action.payload);
            return { ...state, perfumes: perfumes, isPerfumeLoading: false };

        case RESET_PERFUMES_STATE:
            return { perfumes: [], isPerfumeLoading: true };

        default:
            return state;
    }
};

export default perfumesReducer;
