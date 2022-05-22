import { AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { perfumesData } from "../../test-data/perfume-test-data";
import { setPerfumesLoadingState, setPerfumes } from "../../../redux/perfumes/perfumes-actions";
import {
    fetchPerfumes,
    fetchPerfumesByFilterParams,
    fetchPerfumesByGender,
    fetchPerfumesByIds,
    fetchPerfumesByIdsQuery,
    fetchPerfumesByPerfumer,
    fetchPerfumesByQuery
} from "../../../redux/perfumes/perfumes-thunks";
import { PerfumesState } from "../../../redux/perfumes/perfumes-reducer";
import {
    API_BASE_URL,
    PERFUMES,
    PERFUMES_GRAPHQL_IDS,
    PERFUMES_GRAPHQL_PERFUMES,
    PERFUMES_IDS,
    PERFUMES_SEARCH,
    PERFUMES_SEARCH_GENDER,
    PERFUMES_SEARCH_PERFUMER
} from "../../../constants/urlConstants";
import {LoadingStatus} from "../../../types/types";

const middlewares = [thunk];
const mockStore = configureMockStore<PerfumesState, ThunkDispatch<PerfumesState, void, AnyAction>>(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

describe("perfumes actions", () => {
    beforeEach(() => {
        store.clearActions();
    });

    test("fetchPerfumes should dispatches LOADING_PERFUME and SET_PERFUMES on success", async () => {
        mock.onGet(API_BASE_URL + PERFUMES).reply(200, perfumesData);
        await store.dispatch(fetchPerfumes());
        let expectedActions = [setPerfumesLoadingState(LoadingStatus.LOADING), setPerfumes(perfumesData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfumesByIds should dispatches LOADING_PERFUME and FETCH_PERFUMES on success", async () => {
        mock.onPost(API_BASE_URL + PERFUMES_IDS).reply(200, perfumesData);
        await store.dispatch(fetchPerfumesByIds([34, 35, 38]));
        let expectedActions = [setPerfumesLoadingState(LoadingStatus.LOADING), setPerfumes(perfumesData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfumesByFilterParams should dispatches LOADING_PERFUME and SET_PERFUMES on success", async () => {
        mock.onPost(API_BASE_URL + PERFUMES_SEARCH).reply(200, perfumesData);
        await store.dispatch(fetchPerfumesByFilterParams({ perfumers: ["Creed"], genders: [], prices: [] }));
        let expectedActions = [setPerfumesLoadingState(LoadingStatus.LOADING), setPerfumes(perfumesData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfumesByGender should dispatches LOADING_PERFUME and SET_PERFUMES on success", async () => {
        mock.onPost(API_BASE_URL + PERFUMES_SEARCH_GENDER).reply(200, perfumesData);
        await store.dispatch(fetchPerfumesByGender({ perfumeGender: "male" }));
        let expectedActions = [setPerfumesLoadingState(LoadingStatus.LOADING), setPerfumes(perfumesData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfumesByPerfumer should dispatches LOADING_PERFUME and SET_PERFUMES on success", async () => {
        mock.onPost(API_BASE_URL + PERFUMES_SEARCH_PERFUMER).reply(200, perfumesData);
        await store.dispatch(fetchPerfumesByPerfumer({ perfumer: "Creed" }));
        let expectedActions = [setPerfumesLoadingState(LoadingStatus.LOADING), setPerfumes(perfumesData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfumesByQuery should dispatches LOADING_PERFUME and SET_PERFUMES on success", async () => {
        mock.onPost(API_BASE_URL + PERFUMES_GRAPHQL_PERFUMES).reply(200, { data: { perfumes: perfumesData } });
        await store.dispatch(fetchPerfumesByQuery());
        let expectedActions = [setPerfumesLoadingState(LoadingStatus.LOADING), setPerfumes(perfumesData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfumesByIdsQuery should dispatches LOADING_PERFUME and SET_PERFUMES on success", async () => {
        mock.onPost(API_BASE_URL + PERFUMES_GRAPHQL_IDS).reply(200, { data: { perfumesIds: perfumesData } });
        await store.dispatch(fetchPerfumesByIdsQuery([34, 35, 38]));
        let expectedActions = [setPerfumesLoadingState(LoadingStatus.LOADING), setPerfumes(perfumesData)];
        expect(store.getActions()).toEqual(expectedActions);
    });
});
