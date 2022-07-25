import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {
    ADMIN_ADD,
    ADMIN_DELETE,
    ADMIN_EDIT,
    ADMIN_GRAPHQL_USER,
    ADMIN_GRAPHQL_USER_ALL,
    ADMIN_USER,
    ADMIN_USER_ALL,
    API_BASE_URL
} from "../../../constants/urlConstants";
import { store } from "../../../store";
import {
    addPerfume,
    deletePerfume,
    fetchAllUsers,
    fetchAllUsersByQuery,
    fetchUserInfo,
    fetchUserInfoByQuery,
    updatePerfume
} from "../admin-thunks";
import { LoadingStatus } from "../../../types/types";
import { mockPerfumesResponse, perfumeErrorData } from "../../../utils/test/__mocks__/perfumes-mock";
import { initialState } from "../admin-slice";
import { userData, mockBaseUsersResponse } from "../../../utils/test/__mocks__/users-mock";

describe("admin slice tests", () => {
    const mock = new MockAdapter(axios);
    const mockFormData: FormData = new FormData();
    let state = store.getState().admin;

    beforeEach(() => {
        state = initialState;
        mockFormData.append("file", "file");
        mockFormData.append("perfume", new Blob([JSON.stringify(mockPerfumesResponse)], { type: "application/json" }));
    });

    it("should addPerfume dispatches pending and fulfilled on success", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.isPerfumeAdded).toEqual(false);

        mock.onPost(API_BASE_URL + ADMIN_ADD).reply(200);
        const result = await store.dispatch(addPerfume(mockFormData));

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
        const result = await store.dispatch(addPerfume(mockFormData));

        state = store.getState().admin;
        expect(result.type).toBe("admin/addPerfume/rejected");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.isPerfumeAdded).toEqual(false);
        expect(state.errors).toEqual(perfumeErrorData);
    });

    it("should updatePerfume dispatches pending and fulfilled on success", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.isPerfumeEdited).toEqual(false);
        expect(store.getState().perfume.perfume).toEqual({});

        mock.onPost(API_BASE_URL + ADMIN_EDIT).reply(200, mockPerfumesResponse);
        const result = await store.dispatch(updatePerfume(mockFormData));

        state = store.getState().admin;
        expect(result.type).toBe("admin/updatePerfume/fulfilled");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.isPerfumeEdited).toEqual(true);
        expect(store.getState().perfume.perfume).toEqual(mockPerfumesResponse);
    });

    it("should updatePerfume dispatches pending and fulfilled on failure", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.isPerfumeEdited).toEqual(false);
        expect(state.errors).toEqual({});

        mock.onPost(API_BASE_URL + ADMIN_EDIT).reply(400, perfumeErrorData);
        const result = await store.dispatch(updatePerfume(mockFormData));

        state = store.getState().admin;

        expect(result.type).toBe("admin/updatePerfume/rejected");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.isPerfumeEdited).toEqual(false);
        expect(state.errors).toEqual(perfumeErrorData);
    });

    it("should deletePerfume dispatches fulfilled on success", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.isPerfumeDeleted).toEqual(false);
        expect(state.errors).toEqual({});

        mock.onDelete(API_BASE_URL + `${ADMIN_DELETE}/${1}`).reply(200, "Perfume deleted successfully");
        const result = await store.dispatch(deletePerfume(1));

        state = store.getState().admin;

        expect(result.type).toBe("admin/deletePerfume/fulfilled");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.isPerfumeDeleted).toEqual(true);
        expect(state.errors).toEqual({});
    });

    it("should fetchAllUsers dispatches fulfilled on success", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.users).toEqual([]);

        mock.onGet(API_BASE_URL + `${ADMIN_USER_ALL}?page=1`).reply(200, mockBaseUsersResponse, {
            "page-total-count": "1",
            "page-total-elements": "11"
        });
        const result = await store.dispatch(fetchAllUsers(1));

        state = store.getState().admin;

        expect(result.type).toBe("admin/fetchAllUsers/fulfilled");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.users).toEqual(mockBaseUsersResponse);
    });

    it("should fetchUserInfo dispatches fulfilled on success", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.user).toEqual({});

        mock.onGet(API_BASE_URL + `${ADMIN_USER}/1`).reply(200, userData);
        const result = await store.dispatch(fetchUserInfo("1"));

        state = store.getState().admin;

        expect(result.type).toBe("admin/fetchUserInfo/fulfilled");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.user).toEqual(userData);
    });

    it("should fetchUserInfoByQuery dispatches fulfilled on success", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.user).toEqual({});

        mock.onPost(API_BASE_URL + ADMIN_GRAPHQL_USER).reply(200, userData);
        const result = await store.dispatch(fetchUserInfoByQuery("1"));

        state = store.getState().admin;

        expect(result.type).toBe("admin/fetchUserInfoByQuery/fulfilled");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.user).toEqual(userData);
    });

    it("should fetchAllUsersByQuery dispatches fulfilled on success", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.users).toEqual([]);

        mock.onPost(API_BASE_URL + ADMIN_GRAPHQL_USER_ALL).reply(200, mockBaseUsersResponse);
        const result = await store.dispatch(fetchAllUsersByQuery());

        state = store.getState().admin;

        expect(result.type).toBe("admin/fetchAllUsersByQuery/fulfilled");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.users).toEqual(mockBaseUsersResponse);
    });
});
