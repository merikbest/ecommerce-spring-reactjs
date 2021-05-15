import rootReducer from "../../../redux/reducers/root-reducer";
import {createStore} from "redux";
import perfumeReducer, {InitialStateType} from "../../../redux/reducers/perfume-reducer";
import {Perfume} from "../../../types/types";
import {
    fetchPerfumeByQuerySuccess,
    fetchPerfumesByFilterParamsSuccess,
    fetchPerfumesByGenderSuccess,
    fetchPerfumesByPerfumerSuccess,
    fetchPerfumesByQuerySuccess,
    fetchPerfumeSuccess,
    getPerfumes,
    loadingPerfume
} from "../../../redux/actions/perfume-actions";
import {perfumeData, perfumesData} from "../../test-data/perfume-test-data";

let store = createStore(rootReducer);
let perfume: Perfume;
let perfumes: Array<Perfume>;

beforeEach(() => {
    perfume = perfumeData;
    perfumes = perfumesData;
});

test("Loading Perfume", () => {
    const state: InitialStateType = perfumeReducer(store.getState().perfume, loadingPerfume());
    expect(state.isPerfumeLoading).toBeTruthy();
});

test("Fetch Perfume", () => {
    const state: InitialStateType = perfumeReducer(store.getState().perfume, fetchPerfumeSuccess(perfume));
    expect(state.perfume).toEqual(perfume);
    expect(state.isPerfumeLoading).toBeFalsy();
    expect(state.reviews.length).toEqual(3);
});

test("Fetch Perfume By Query", () => {
    const state: InitialStateType = perfumeReducer(store.getState().perfume, fetchPerfumeByQuerySuccess(perfume));
    expect(state.perfume).toEqual(perfume);
    expect(state.isPerfumeLoading).toBeFalsy();
    expect(state.reviews.length).toEqual(3);
});

test("Fetch Perfumes", () => {
    const state: InitialStateType = perfumeReducer(store.getState().perfume, getPerfumes(perfumes));
    expect(state.perfumes.length).toEqual(3);
    expect(state.perfumes[0]).toEqual(perfume);
    expect(state.isPerfumeLoading).toBeFalsy();
});

test("Fetch Perfumes By Query", () => {
    const state: InitialStateType = perfumeReducer(store.getState().perfume, fetchPerfumesByQuerySuccess(perfumes));
    expect(state.perfumes.length).toEqual(3);
    expect(state.isPerfumeLoading).toBeFalsy();
});

test("Fetch Perfumes By Gender", () => {
    const state: InitialStateType = perfumeReducer(store.getState().perfume, fetchPerfumesByGenderSuccess(perfumes));
    expect(state.perfumes.length).toEqual(3);
    expect(state.isPerfumeLoading).toBeFalsy();
});

test("Fetch Perfumes By Perfumer", () => {
    const state: InitialStateType = perfumeReducer(store.getState().perfume, fetchPerfumesByPerfumerSuccess(perfumes));
    expect(state.perfumes.length).toEqual(3);
    expect(state.isPerfumeLoading).toBeFalsy();
});

test("Fetch Perfumes By Filter Params", () => {
    const state: InitialStateType = perfumeReducer(store.getState().perfume, fetchPerfumesByFilterParamsSuccess(perfumes));
    expect(state.perfumes.length).toEqual(3);
    expect(state.isPerfumeLoading).toBeFalsy();
});
