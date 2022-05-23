import thunk, { ThunkDispatch } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { AnyAction } from "redux";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { AdminState } from "../../../redux/admin/admin-reducer";
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
import { perfumeData, perfumeErrorData, perfumesData } from "../../test-data/perfume-test-data";
import {
    addPerfume,
    deletePerfume,
    fetchAllUsers,
    fetchAllUsersByQuery,
    fetchUserInfo,
    fetchUserInfoByQuery,
    updatePerfume
} from "../../../redux/admin/admin-thunks";
import {
    addPerfumeFailure,
    addPerfumeSuccess, deletePerfumeSuccess,
    setAdminLoadingState,
    setAllUsers,
    setUserInfo,
    updatePerfumeFailure,
    updatePerfumeSuccess
} from "../../../redux/admin/admin-actions";
import {removePerfumeById, setPerfumes} from "../../../redux/perfumes/perfumes-actions";
import { userData, usersData } from "../../test-data/user-test-data";
import { setPerfume } from "../../../redux/perfume/perfume-actions";
import { LoadingStatus } from "../../../types/types";

const middlewares = [thunk];
const mockStore = configureMockStore<AdminState, ThunkDispatch<AdminState, void, AnyAction>>(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

describe("admin actions", () => {
    const bodyFormData: FormData = new FormData();

    beforeEach(() => {
        store.clearActions();
        bodyFormData.append("file", "file");
        bodyFormData.append("perfume", new Blob([JSON.stringify(perfumeData)], { type: "application/json" }));
    });

    test("addPerfume should dispatches USER_UPDATED_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + ADMIN_ADD).reply(200);
        await store.dispatch(addPerfume(bodyFormData));
        const expectedActions = [setAdminLoadingState(LoadingStatus.LOADING), addPerfumeSuccess()];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("addPerfume should dispatches PERFUME_ADDED_FAILURE on failure", async () => {
        mock.onPost(API_BASE_URL + ADMIN_ADD).reply(400, perfumeErrorData);
        await store.dispatch(addPerfume(bodyFormData));
        const expectedActions = [setAdminLoadingState(LoadingStatus.LOADING), addPerfumeFailure(perfumeErrorData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("updatePerfume should dispatches PERFUME_UPDATED_SUCCESS and FETCH_PERFUME_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + ADMIN_EDIT).reply(200, perfumeData);
        await store.dispatch(updatePerfume(bodyFormData));
        const expectedActions = [
            setAdminLoadingState(LoadingStatus.LOADING),
            updatePerfumeSuccess(),
            setPerfume(perfumeData)
        ];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("updatePerfume should dispatches PERFUME_UPDATED_FAILURE on failure", async () => {
        mock.onPost(API_BASE_URL + ADMIN_EDIT).reply(400, perfumeErrorData);
        await store.dispatch(updatePerfume(bodyFormData));
        const expectedActions = [setAdminLoadingState(LoadingStatus.LOADING), updatePerfumeFailure(perfumeErrorData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("deletePerfume should dispatches FETCH_PERFUMES on success", async () => {
        mock.onDelete(API_BASE_URL + `${ADMIN_DELETE}/${1}`).reply(200, perfumesData);
        await store.dispatch(deletePerfume(1));
        const expectedActions = [deletePerfumeSuccess(), removePerfumeById(1)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchAllUsers should dispatches LOADING_DATA and FETCH_ALL_USERS_SUCCESS on success", async () => {
        mock.onGet(API_BASE_URL + ADMIN_USER_ALL).reply(200, usersData);
        await store.dispatch(fetchAllUsers());
        let expectedActions = [setAdminLoadingState(LoadingStatus.LOADING), setAllUsers(usersData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchUserInfo should dispatches LOADING_DATA and FETCH_USER_INFO_SUCCESS on success", async () => {
        mock.onGet(API_BASE_URL + `${ADMIN_USER}/${1}`).reply(200, userData);
        await store.dispatch(fetchUserInfo("1"));
        let expectedActions = [setAdminLoadingState(LoadingStatus.LOADING), setUserInfo(userData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchUserInfoByQuery should dispatches LOADING_DATA and FETCH_USER_INFO_BY_QUERY_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + ADMIN_GRAPHQL_USER).reply(200, { data: { user: userData } });
        await store.dispatch(fetchUserInfoByQuery("1"));
        let expectedActions = [setAdminLoadingState(LoadingStatus.LOADING), setUserInfo(userData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchAllUsersByQuery should dispatches LOADING_DATA and FETCH_ALL_USERS_BY_QUERY_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + ADMIN_GRAPHQL_USER_ALL).reply(200, { data: { users: usersData } });
        await store.dispatch(fetchAllUsersByQuery());
        let expectedActions = [setAdminLoadingState(LoadingStatus.LOADING), setAllUsers(usersData)];
        expect(store.getActions()).toEqual(expectedActions);
    });
});
