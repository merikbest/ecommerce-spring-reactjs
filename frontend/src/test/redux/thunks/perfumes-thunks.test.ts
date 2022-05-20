import {AnyAction} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {perfumesData} from "../../test-data/perfume-test-data";
import {
    fetchPerfumesByFilterParamsSuccess,
    fetchPerfumesByGenderSuccess,
    fetchPerfumesByPerfumerSuccess,
    fetchPerfumesByQuerySuccess,
    setPerfumes,
    loadingPerfume
} from "../../../redux/perfumes/perfumes-actions";
import {
    fetchPerfumes,
    fetchPerfumesByFilterParams,
    fetchPerfumesByGender,
    fetchPerfumesByIds,
    fetchPerfumesByIdsQuery,
    fetchPerfumesByPerfumer,
    fetchPerfumesByQuery
} from "../../../redux/perfumes/perfumes-thunks";
import {PerfumesState} from "../../../redux/perfumes/perfumes-reducer";
import {API_BASE_URL} from "../../../utils/constants/url";

const middlewares = [thunk];
const mockStore = configureMockStore<PerfumesState, ThunkDispatch<PerfumesState, void, AnyAction>>(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

describe("perfumes actions", () => {

    beforeEach(() => {
        store.clearActions();
    });

    test("fetchPerfumes should dispatches LOADING_PERFUME and FETCH_PERFUMES on success", async () => {
        mock.onGet(API_BASE_URL + "/perfumes").reply(200, perfumesData);
        await store.dispatch(fetchPerfumes());
        let expectedActions = [loadingPerfume(), setPerfumes(perfumesData)];
        expect(store.getActions()).toEqual(expectedActions);
    });
    
    test("fetchPerfumesByIds should dispatches LOADING_PERFUME and FETCH_PERFUMES on success", async () => {
        mock.onPost(API_BASE_URL + "/perfumes/ids").reply(200, perfumesData);
        await store.dispatch(fetchPerfumesByIds([34, 35, 38]));
        let expectedActions = [loadingPerfume(), setPerfumes(perfumesData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfumesByFilterParams should dispatches LOADING_PERFUME and FETCH_PERFUMES_BY_FILTER_PARAMS_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/perfumes/search").reply(200, perfumesData);
        await store.dispatch(fetchPerfumesByFilterParams({perfumers: ["Creed"], genders: [], prices: []}));
        let expectedActions = [loadingPerfume(), fetchPerfumesByFilterParamsSuccess(perfumesData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfumesByGender should dispatches LOADING_PERFUME and FETCH_PERFUMES_BY_GENDER_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/perfumes/search/gender").reply(200, perfumesData);
        await store.dispatch(fetchPerfumesByGender({perfumeGender: "male"}));
        let expectedActions = [loadingPerfume(), fetchPerfumesByGenderSuccess(perfumesData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfumesByPerfumer should dispatches LOADING_PERFUME and FETCH_PERFUMES_BY_PERFUMER_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/perfumes/search/perfumer").reply(200, perfumesData);
        await store.dispatch(fetchPerfumesByPerfumer({perfumer: "Creed"}));
        let expectedActions = [loadingPerfume(), fetchPerfumesByPerfumerSuccess(perfumesData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfumesByQuery should dispatches LOADING_PERFUME and FETCH_PERFUMES_BY_QUERY_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/perfumes/graphql/perfumes").reply(200, {data: {perfumes: perfumesData}});
        await store.dispatch(fetchPerfumesByQuery());
        let expectedActions = [loadingPerfume(), fetchPerfumesByQuerySuccess(perfumesData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfumesByIdsQuery should dispatches LOADING_PERFUME and FETCH_PERFUMES_BY_QUERY_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/perfumes/graphql/ids").reply(200, {data: {perfumesIds: perfumesData}});
        await store.dispatch(fetchPerfumesByIdsQuery([34, 35, 38]));
        let expectedActions = [loadingPerfume(), fetchPerfumesByQuerySuccess(perfumesData)];
        expect(store.getActions()).toEqual(expectedActions);
    });
});
