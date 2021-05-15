import {AnyAction} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {perfumeData, perfumesData} from "../../test-data/perfume-test-data";
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
import {
    fetchPerfume,
    fetchPerfumeByQuery,
    fetchPerfumes,
    fetchPerfumesByFilterParams,
    fetchPerfumesByGender,
    fetchPerfumesByIds,
    fetchPerfumesByIdsQuery,
    fetchPerfumesByPerfumer,
    fetchPerfumesByQuery
} from "../../../redux/thunks/perfume-thunks";
import {InitialStateType} from "../../../redux/reducers/perfume-reducer";
import {API_BASE_URL} from "../../../utils/constants/url";

const middlewares = [thunk];
const mockStore = configureMockStore<InitialStateType, ThunkDispatch<InitialStateType, void, AnyAction>>(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

describe("perfume actions", () => {

    beforeEach(() => {
        store.clearActions();
    });

    test("fetchPerfumes should dispatches LOADING_PERFUME and FETCH_PERFUMES on success", async () => {
        mock.onGet(API_BASE_URL + "/perfumes").reply(200, perfumesData);
        await store.dispatch(fetchPerfumes());
        let expectedActions = [loadingPerfume(), getPerfumes(perfumesData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfume should dispatches LOADING_PERFUME and FETCH_PERFUME_SUCCESS on success", async () => {
        mock.onGet(API_BASE_URL + "/perfumes/34").reply(200, perfumeData);
        await store.dispatch(fetchPerfume("34"));
        let expectedActions = [loadingPerfume(), fetchPerfumeSuccess(perfumeData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfumesByIds should dispatches LOADING_PERFUME and FETCH_PERFUMES on success", async () => {
        mock.onPost(API_BASE_URL + "/perfumes/ids").reply(200, perfumesData);
        await store.dispatch(fetchPerfumesByIds([34, 35, 38]));
        let expectedActions = [loadingPerfume(), getPerfumes(perfumesData)];
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

    test("fetchPerfumeByQuery should dispatches FETCH_PERFUME_BY_QUERY_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/perfumes/graphql/perfume").reply(200, {data: {perfume: perfumeData}});
        await store.dispatch(fetchPerfumeByQuery("1"));
        let expectedActions = [loadingPerfume(), fetchPerfumeByQuerySuccess(perfumeData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfumesByIdsQuery should dispatches LOADING_PERFUME and FETCH_PERFUMES_BY_QUERY_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/perfumes/graphql/ids").reply(200, {data: {perfumesIds: perfumesData}});
        await store.dispatch(fetchPerfumesByIdsQuery([34, 35, 38]));
        let expectedActions = [loadingPerfume(), fetchPerfumesByQuerySuccess(perfumesData)];
        expect(store.getActions()).toEqual(expectedActions);
    });
});
