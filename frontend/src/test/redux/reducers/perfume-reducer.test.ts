import { createStore } from "redux";

import perfumeReducer, { PerfumeState } from "../../../redux/perfume/perfume-reducer";
import rootReducer from "../../../redux/root-reducer";
import {
    loadingPerfume,
    resetPerfumeState,
    setPerfume,
    setPerfumeByQuery
} from "../../../redux/perfume/perfume-actions";
import { perfumeData } from "../../test-data/perfume-test-data";

describe("perfume reducer", () => {
    const perfumeStore = createStore(rootReducer).getState().perfume;

    test("should Loading Perfume", () => {
        const state: PerfumeState = perfumeReducer(perfumeStore, loadingPerfume());
        expect(state.perfume).toEqual({});
        expect(state.isPerfumeLoading).toBeTruthy();
        expect(state.reviews.length).toEqual(0);
    });

    test("should Set Perfume", () => {
        const state: PerfumeState = perfumeReducer(perfumeStore, setPerfume(perfumeData));
        expect(state.perfume).toEqual(perfumeData);
        expect(state.isPerfumeLoading).toBeFalsy();
        expect(state.reviews.length).toEqual(3);
    });

    test("should Set Perfume By Query", () => {
        const state: PerfumeState = perfumeReducer(perfumeStore, setPerfumeByQuery(perfumeData));
        expect(state.perfume).toEqual(perfumeData);
        expect(state.isPerfumeLoading).toBeFalsy();
        expect(state.reviews.length).toEqual(3);
    });

    test("should Reset Perfume State", () => {
        const state: PerfumeState = perfumeReducer(perfumeStore, resetPerfumeState());
        expect(state.perfume).toEqual({});
        expect(state.isPerfumeLoading).toBeTruthy();
        expect(state.reviews.length).toEqual(0);
    });
});
