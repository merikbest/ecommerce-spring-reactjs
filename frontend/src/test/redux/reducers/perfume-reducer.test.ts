import { createStore } from "redux";

import perfumeReducer, { PerfumeState } from "../../../redux/perfume/perfume-reducer";
import rootReducer from "../../../redux/root-reducer";
import {
    resetPerfumeState,
    setPerfume,
    setPerfumeByQuery,
    setPerfumeError,
    setPerfumeLoadingState,
    setReview,
    setReviews
} from "../../../redux/perfume/perfume-actions";
import { perfumeData } from "../../test-data/perfume-test-data";
import { LoadingStatus } from "../../../types/types";

describe("perfume reducer", () => {
    const perfumeStore = createStore(rootReducer).getState().perfume;

    test("should Loading Perfume", () => {
        const state: PerfumeState = perfumeReducer(perfumeStore, setPerfumeLoadingState(LoadingStatus.LOADING));
        expect(state.perfume).toEqual({});
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.reviews.length).toEqual(0);
    });

    test("should Set Perfume Error", () => {
        const state: PerfumeState = perfumeReducer(perfumeStore, setPerfumeError("ERROR"));
        expect(state.perfume).toEqual({});
        expect(state.loadingState).toEqual(LoadingStatus.ERROR);
        expect(state.errorMessage).toEqual("ERROR");
        expect(state.reviews.length).toEqual(0);
    });

    test("should Set Perfume", () => {
        const state: PerfumeState = perfumeReducer(perfumeStore, setPerfume(perfumeData));
        expect(state.perfume).toEqual(perfumeData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    test("should Set Reviews", () => {
        const state: PerfumeState = perfumeReducer(perfumeStore, setReviews(perfumeData.reviews));
        expect(state.reviews).toEqual(perfumeData.reviews);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    test("should Set Review", () => {
        const state: PerfumeState = perfumeReducer(perfumeStore, setReview(perfumeData.reviews[0]));
        expect(state.reviews).toEqual([perfumeData.reviews[0]]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
    });

    test("should Set Perfume By Query", () => {
        const state: PerfumeState = perfumeReducer(perfumeStore, setPerfumeByQuery(perfumeData));
        expect(state.perfume).toEqual(perfumeData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    test("should Reset Perfume State", () => {
        const state: PerfumeState = perfumeReducer(perfumeStore, resetPerfumeState());
        expect(state.perfume).toEqual({});
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
    });
});
