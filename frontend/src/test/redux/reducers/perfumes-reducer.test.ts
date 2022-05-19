import {createStore} from "redux";

import rootReducer from "../../../redux/root-reducer";
import perfumesReducer, {PerfumesState} from "../../../redux/perfumes/perfumes-reducer";
import {Perfume} from "../../../types/types";
import {
    fetchPerfumesByFilterParamsSuccess,
    fetchPerfumesByGenderSuccess,
    fetchPerfumesByPerfumerSuccess,
    fetchPerfumesByQuerySuccess,
    getPerfumes,
    loadingPerfume
} from "../../../redux/perfumes/perfumes-actions";
import {perfumeData, perfumesData} from "../../test-data/perfume-test-data";

let store = createStore(rootReducer);
let perfume: Perfume;
let perfumes: Array<Perfume>;

beforeEach(() => {
    perfume = perfumeData;
    perfumes = perfumesData;
});

test("Loading Perfume", () => {
    const state: PerfumesState = perfumesReducer(store.getState().perfumes, loadingPerfume());
    expect(state.isPerfumeLoading).toBeTruthy();
});

test("Fetch Perfumes", () => {
    const state: PerfumesState = perfumesReducer(store.getState().perfumes, getPerfumes(perfumes));
    expect(state.perfumes.length).toEqual(3);
    expect(state.perfumes[0]).toEqual(perfume);
    expect(state.isPerfumeLoading).toBeFalsy();
});

test("Fetch Perfumes By Query", () => {
    const state: PerfumesState = perfumesReducer(store.getState().perfumes, fetchPerfumesByQuerySuccess(perfumes));
    expect(state.perfumes.length).toEqual(3);
    expect(state.isPerfumeLoading).toBeFalsy();
});

test("Fetch Perfumes By Gender", () => {
    const state: PerfumesState = perfumesReducer(store.getState().perfumes, fetchPerfumesByGenderSuccess(perfumes));
    expect(state.perfumes.length).toEqual(3);
    expect(state.isPerfumeLoading).toBeFalsy();
});

test("Fetch Perfumes By Perfumer", () => {
    const state: PerfumesState = perfumesReducer(store.getState().perfumes, fetchPerfumesByPerfumerSuccess(perfumes));
    expect(state.perfumes.length).toEqual(3);
    expect(state.isPerfumeLoading).toBeFalsy();
});

test("Fetch Perfumes By Filter Params", () => {
    const state: PerfumesState = perfumesReducer(store.getState().perfumes, fetchPerfumesByFilterParamsSuccess(perfumes));
    expect(state.perfumes.length).toEqual(3);
    expect(state.isPerfumeLoading).toBeFalsy();
});
