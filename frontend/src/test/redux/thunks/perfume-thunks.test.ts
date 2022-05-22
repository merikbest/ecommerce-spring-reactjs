import { AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { PerfumesState } from "../../../redux/perfumes/perfumes-reducer";
import {API_BASE_URL, PERFUMES, PERFUMES_GRAPHQL_PERFUME, PERFUMES_REVIEWS} from "../../../constants/urlConstants";
import { perfumeData } from "../../test-data/perfume-test-data";
import {fetchPerfume, fetchPerfumeByQuery, fetchReviewsByPerfumeId} from "../../../redux/perfume/perfume-thunks";
import {
    setPerfumeLoadingState,
    setPerfume,
    setPerfumeByQuery,
    setPerfumeError, setReviews
} from "../../../redux/perfume/perfume-actions";
import {LoadingStatus} from "../../../types/types";

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
        let expectedActions = [setPerfumeLoadingState(LoadingStatus.LOADING), setPerfume(perfumeData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfume should dispatches LOADING_PERFUME and SET_PERFUME_ERROR on failure", async () => {
        mock.onGet(API_BASE_URL + `${PERFUMES}/34`).reply(400, "ERROR");
        await store.dispatch(fetchPerfume("34"));
        let expectedActions = [setPerfumeLoadingState(LoadingStatus.LOADING), setPerfumeError("ERROR")];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchReviewsByPerfumeId should dispatches LOADING_PERFUME and SET_PERFUME_ERROR on success", async () => {
        mock.onGet(API_BASE_URL + `${PERFUMES_REVIEWS}/34`).reply(200, perfumeData.reviews);
        await store.dispatch(fetchReviewsByPerfumeId("34"));
        let expectedActions = [setReviews(perfumeData.reviews)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfumeByQuery should dispatches SET_PERFUME on success", async () => {
        mock.onPost(API_BASE_URL + PERFUMES_GRAPHQL_PERFUME).reply(200, { data: { perfume: perfumeData } });
        await store.dispatch(fetchPerfumeByQuery("1"));
        let expectedActions = [setPerfumeLoadingState(LoadingStatus.LOADING), setPerfumeByQuery(perfumeData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchPerfumeByQuery should dispatches SET_PERFUME_ERROR on failure", async () => {
        mock.onPost(API_BASE_URL + PERFUMES_GRAPHQL_PERFUME).reply(400, "ERROR");
        await store.dispatch(fetchPerfumeByQuery("1"));
        let expectedActions = [setPerfumeLoadingState(LoadingStatus.LOADING), setPerfumeError("ERROR")];
        expect(store.getActions()).toEqual(expectedActions);
    });
});
