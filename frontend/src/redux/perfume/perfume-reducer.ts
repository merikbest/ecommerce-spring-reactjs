import { LoadingStatus, Perfume, Review } from "../../types/types";
import {
    PerfumeActionTypes,
    RESET_PERFUME_STATE,
    SET_PERFUME,
    SET_PERFUME_BY_QUERY,
    SET_PERFUME_ERROR,
    SET_PERFUME_LOADING_STATE,
    SET_REVIEW,
    SET_REVIEWS
} from "./perfume-action-types";

export type PerfumeState = {
    perfume: Partial<Perfume>;
    reviews: Array<Review>;
    errorMessage: string;
    loadingState: LoadingStatus;
};

const initialState: PerfumeState = {
    perfume: {},
    reviews: [],
    errorMessage: "",
    loadingState: LoadingStatus.LOADING
};

const perfumeReducer = (state: PerfumeState = initialState, action: PerfumeActionTypes): PerfumeState => {
    switch (action.type) {
        case SET_PERFUME_LOADING_STATE:
            return { ...state, loadingState: action.payload };

        case SET_PERFUME_ERROR:
            return { ...state, errorMessage: action.payload, loadingState: LoadingStatus.ERROR };

        case SET_PERFUME:
            return { ...state, perfume: action.payload, loadingState: LoadingStatus.LOADED };

        case SET_REVIEWS:
            return { ...state, reviews: action.payload, loadingState: LoadingStatus.LOADED };

        case SET_REVIEW:
            return { ...state, reviews: [...state.reviews, action.payload] };

        case SET_PERFUME_BY_QUERY:
            return { ...state, perfume: action.payload, loadingState: LoadingStatus.LOADED };

        case RESET_PERFUME_STATE:
            return { ...initialState };

        default:
            return state;
    }
};

export default perfumeReducer;
