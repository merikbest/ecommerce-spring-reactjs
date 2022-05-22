import { LoadingStatus, Perfume } from "../../types/types";
import {
    PerfumesActionTypes,
    REMOVE_PERFUME_BY_ID,
    RESET_PERFUMES_STATE,
    SET_PERFUMES,
    SET_PERFUMES_LOADING_STATE
} from "./perfumes-action-types";

export type PerfumesState = {
    perfumes: Array<Perfume>;
    loadingState: LoadingStatus;
};

const initialState: PerfumesState = {
    perfumes: [],
    loadingState: LoadingStatus.LOADING
};

const perfumesReducer = (state: PerfumesState = initialState, action: PerfumesActionTypes): PerfumesState => {
    switch (action.type) {
        case SET_PERFUMES_LOADING_STATE:
            return { ...state, loadingState: action.payload };

        case SET_PERFUMES:
            return { ...state, perfumes: action.payload, loadingState: LoadingStatus.LOADED };

        case REMOVE_PERFUME_BY_ID:
            const perfumes = state.perfumes.filter((perfume) => perfume.id !== action.payload);
            return { ...state, perfumes: perfumes, loadingState: LoadingStatus.LOADED };

        case RESET_PERFUMES_STATE:
            return { ...initialState };

        default:
            return state;
    }
};

export default perfumesReducer;
