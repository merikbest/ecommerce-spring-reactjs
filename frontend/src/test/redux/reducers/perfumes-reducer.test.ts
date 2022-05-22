import { createStore } from "redux";

import rootReducer from "../../../redux/root-reducer";
import perfumesReducer, { PerfumesState } from "../../../redux/perfumes/perfumes-reducer";
import {
    removePerfumeById,
    resetPerfumesState,
    setPerfumes,
    setPerfumesLoadingState
} from "../../../redux/perfumes/perfumes-actions";
import { perfumeData, perfumesData } from "../../test-data/perfume-test-data";
import { LoadingStatus } from "../../../types/types";

describe("perfumes reducer", () => {
    const perfumesStore = createStore(rootReducer).getState().perfumes;

    test("should Loading Perfume", () => {
        const state: PerfumesState = perfumesReducer(perfumesStore, setPerfumesLoadingState(LoadingStatus.LOADING));
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
    });

    test("should Set Perfumes", () => {
        const state: PerfumesState = perfumesReducer(perfumesStore, setPerfumes(perfumesData));
        expect(state.perfumes.length).toEqual(3);
        expect(state.perfumes[0]).toEqual(perfumeData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    test("should Remove Perfume By Id", () => {
        const state: PerfumesState = perfumesReducer(
            { ...perfumesStore, perfumes: perfumesData },
            removePerfumeById(34)
        );
        expect(state.perfumes.length).toEqual(2);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    test("should Reset Perfumes", () => {
        const state: PerfumesState = perfumesReducer(perfumesStore, resetPerfumesState());
        expect(state.perfumes.length).toEqual(0);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
    });
});
