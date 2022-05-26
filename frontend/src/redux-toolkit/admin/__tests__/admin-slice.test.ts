import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { ADMIN_ADD, API_BASE_URL } from "../../../constants/urlConstants";
import { store } from "../../../store-rtk";
import { addPerfume } from "../admin-thunks";
import { LoadingStatus } from "../../../types/types";
import { perfumeErrorData } from "../../../test/test-data/perfume-test-data";
import { initialState } from "../admin-slice";

describe("Admin slice tests", () => {
    const mock = new MockAdapter(axios);
    let state = store.getState().admin;

    beforeEach(() => {
        state = initialState;
    });

    it("should addPerfume dispatches pending and fulfilled on success", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.isPerfumeAdded).toEqual(false);

        mock.onPost(API_BASE_URL + ADMIN_ADD).reply(200);
        const result = await store.dispatch(addPerfume(new FormData()));

        state = store.getState().admin;
        expect(result.type).toBe("admin/addPerfume/fulfilled");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.isPerfumeAdded).toEqual(true);
    });

    it("should addPerfume dispatches rejected on failure", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.isPerfumeAdded).toEqual(false);
        expect(state.errors).toEqual({});

        mock.onPost(API_BASE_URL + ADMIN_ADD).reply(400, perfumeErrorData);
        const result = await store.dispatch(addPerfume(new FormData()));

        state = store.getState().admin;
        expect(result.type).toBe("admin/addPerfume/rejected");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.isPerfumeAdded).toEqual(false);
        expect(state.errors).toEqual(perfumeErrorData);
    });
    
    
});
