import {createStore} from "redux";

import perfumeReducer from "../../../redux/perfume/perfume-reducer";
import rootReducer from "../../../redux/root-reducer";
import {fetchPerfumeByQuerySuccess, fetchPerfumeSuccess} from "../../../redux/perfume/perfume-actions";
import {PerfumeState} from "../../../redux/perfume/perfume-reducer";
import {Perfume} from "../../../types/types";
import {perfumeData} from "../../test-data/perfume-test-data";

let store = createStore(rootReducer);
let perfume: Perfume;

beforeEach(() => {
    perfume = perfumeData;
});

test("Fetch Perfume", () => {
    const state: PerfumeState = perfumeReducer(store.getState().perfume, fetchPerfumeSuccess(perfume));
    expect(state.perfume).toEqual(perfume);
    expect(state.isPerfumeLoading).toBeFalsy();
    expect(state.reviews.length).toEqual(3);
});

test("Fetch Perfume By Query", () => {
    const state: PerfumeState = perfumeReducer(store.getState().perfume, fetchPerfumeByQuerySuccess(perfume));
    expect(state.perfume).toEqual(perfume);
    expect(state.isPerfumeLoading).toBeFalsy();
    expect(state.reviews.length).toEqual(3);
});