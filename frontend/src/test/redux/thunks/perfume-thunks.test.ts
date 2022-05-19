import {AnyAction} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {PerfumesState} from "../../../redux/perfumes/perfumes-reducer";
import {API_BASE_URL} from "../../../utils/constants/url";
import {perfumeData} from "../../test-data/perfume-test-data";
import {loadingPerfume} from "../../../redux/perfumes/perfumes-actions";
import {fetchPerfume, fetchPerfumeByQuery} from "../../../redux/perfume/perfume-thunks";
import {fetchPerfumeByQuerySuccess, fetchPerfumeSuccess} from "../../../redux/perfume/perfume-actions";

const middlewares = [thunk];
const mockStore = configureMockStore<PerfumesState, ThunkDispatch<PerfumesState, void, AnyAction>>(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

describe("perfume actions", () => {

    beforeEach(() => {
        store.clearActions();
    });

    test("fetchPerfume should dispatches LOADING_PERFUME and FETCH_PERFUME_SUCCESS on success", async () => {
        mock.onGet(API_BASE_URL + "/perfumes/34").reply(200, perfumeData);
        await store.dispatch(fetchPerfume("34"));
        let expectedActions = [loadingPerfume(), fetchPerfumeSuccess(perfumeData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfumeByQuery should dispatches FETCH_PERFUME_BY_QUERY_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/perfumes/graphql/perfume").reply(200, {data: {perfume: perfumeData}});
        await store.dispatch(fetchPerfumeByQuery("1"));
        let expectedActions = [loadingPerfume(), fetchPerfumeByQuerySuccess(perfumeData)];
        expect(store.getActions()).toEqual(expectedActions);
    });
});
