import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { store } from "../../../store";
import { initialState } from "../perfumes-slice";
import { LoadingStatus } from "../../../types/types";
import {
    API_BASE_URL,
    PERFUMES,
    PERFUMES_GRAPHQL_IDS,
    PERFUMES_GRAPHQL_PERFUMES,
    PERFUMES_IDS,
    PERFUMES_SEARCH
} from "../../../constants/urlConstants";
import { mockPerfumesResponse } from "../../../utils/test/__mocks__/perfumes-mock";
import {
    fetchPerfumes,
    fetchPerfumesByFilterParams,
    fetchPerfumesByIds,
    fetchPerfumesByIdsQuery,
    fetchPerfumesByQuery
} from "../perfumes-thunks";

describe("perfumes slice tests", () => {
    const mock = new MockAdapter(axios);
    let state = store.getState().perfumes;

    beforeEach(() => {
        state = initialState;
    });

    it("should fetchPerfumes dispatches fulfilled on success", async () => {
        expect(state.perfumes).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${PERFUMES}?page=1`).reply(200, mockPerfumesResponse, {
            "page-total-count": "1",
            "page-total-elements": "11"
        });
        const result = await store.dispatch(fetchPerfumes(1));

        state = store.getState().perfumes;
        expect(result.type).toBe("perfumes/fetchPerfumes/fulfilled");
        expect(state.perfumes).toEqual(mockPerfumesResponse);
        expect(state.pagesCount).toEqual(1);
        expect(state.totalElements).toEqual(11);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchPerfumesByIds dispatches fulfilled on success", async () => {
        expect(state.perfumes).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + PERFUMES_IDS).reply(200, mockPerfumesResponse);
        const result = await store.dispatch(fetchPerfumesByIds([34, 35, 38]));

        state = store.getState().perfumes;
        expect(result.type).toBe("perfumes/fetchPerfumesByIds/fulfilled");
        expect(state.perfumes).toEqual(mockPerfumesResponse);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchPerfumesByFilterParams dispatches fulfilled on success", async () => {
        expect(state.perfumes).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + `${PERFUMES_SEARCH}?page=1`).reply(200, mockPerfumesResponse, {
            "page-total-count": "1",
            "page-total-elements": "11"
        });
        const result = await store.dispatch(
            fetchPerfumesByFilterParams({ perfumers: ["Creed"], genders: [], prices: [], currentPage: 1 })
        );

        state = store.getState().perfumes;
        expect(result.type).toBe("perfumes/fetchPerfumesByFilterParams/fulfilled");
        expect(state.perfumes).toEqual(mockPerfumesResponse);
        expect(state.pagesCount).toEqual(1);
        expect(state.totalElements).toEqual(11);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchPerfumesByQuery dispatches fulfilled on success", async () => {
        expect(state.perfumes).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + PERFUMES_GRAPHQL_PERFUMES).reply(200, { data: { perfumes: mockPerfumesResponse } });
        const result = await store.dispatch(fetchPerfumesByQuery());

        state = store.getState().perfumes;
        expect(result.type).toBe("perfumes/fetchPerfumesByQuery/fulfilled");
        expect(state.perfumes).toEqual(mockPerfumesResponse);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchPerfumesByIdsQuery dispatches fulfilled on success", async () => {
        expect(state.perfumes).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + PERFUMES_GRAPHQL_IDS).reply(200, { data: { perfumesIds: mockPerfumesResponse } });
        const result = await store.dispatch(fetchPerfumesByIdsQuery([34, 35, 38]));

        state = store.getState().perfumes;
        expect(result.type).toBe("perfumes/fetchPerfumesByIdsQuery/fulfilled");
        expect(state.perfumes).toEqual(mockPerfumesResponse);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });
});
