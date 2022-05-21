import { AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { PerfumesState } from "../../../redux/perfumes/perfumes-reducer";
import { API_BASE_URL, PERFUMES, PERFUMES_GRAPHQL_PERFUME } from "../../../constants/urlConstants";
import { perfumeData } from "../../test-data/perfume-test-data";
import { fetchPerfume, fetchPerfumeByQuery } from "../../../redux/perfume/perfume-thunks";
import { loadingPerfume, setPerfume, setPerfumeByQuery } from "../../../redux/perfume/perfume-actions";

const middlewares = [thunk];
const mockStore = configureMockStore<PerfumesState, ThunkDispatch<PerfumesState, void, AnyAction>>(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

describe("perfume actions", () => {
    beforeEach(() => {
        store.clearActions();
    });

    test("fetchPerfume should dispatches LOADING_PERFUME and SET_PERFUME on success", async () => {
        mock.onGet(API_BASE_URL + `${PERFUMES}/34`).reply(200, perfumeData);
        await store.dispatch(fetchPerfume("34"));
        let expectedActions = [loadingPerfume(), setPerfume(perfumeData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfumeByQuery should dispatches SET_PERFUME on success", async () => {
        mock.onPost(API_BASE_URL + PERFUMES_GRAPHQL_PERFUME).reply(200, { data: { perfume: perfumeData } });
        await store.dispatch(fetchPerfumeByQuery("1"));
        let expectedActions = [loadingPerfume(), setPerfumeByQuery(perfumeData)];
        expect(store.getActions()).toEqual(expectedActions);
    });
});
