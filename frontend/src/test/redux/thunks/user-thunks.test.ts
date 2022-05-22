import { AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { UserState } from "../../../redux/user/user-reducer";
import {
    API_BASE_URL,
    AUTH_EDIT_PASSWORD,
    USERS_EDIT,
    USERS_GRAPHQL_INFO,
    USERS_INFO,
    USERS_REVIEW
} from "../../../constants/urlConstants";
import {
    authErrorsData,
    reviewData,
    reviewErrorsData,
    userData,
    userEditErrorsData,
    userResetPasswordData
} from "../../test-data/user-test-data";
import {
    addReviewToPerfume,
    fetchUserInfo,
    fetchUserInfoByQuery,
    updateUserInfo,
    updateUserPassword
} from "../../../redux/user/user-thunks";
import {
    setUserLoadingState,
    setUpdatedUser,
    setUser,
    userAddedReviewFailure,
    userAddedReviewSuccess,
    userUpdatedFailure,
    userUpdatedPasswordFailure,
    userUpdatedPasswordSuccess
} from "../../../redux/user/user-actions";
import { perfumeData } from "../../test-data/perfume-test-data";
import { setPerfume } from "../../../redux/perfume/perfume-actions";
import {LoadingStatus} from "../../../types/types";

const middlewares = [thunk];
const mockStore = configureMockStore<UserState, ThunkDispatch<UserState, void, AnyAction>>(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

describe("user actions", () => {
    beforeEach(() => {
        store.clearActions();
    });

    test("fetchUserInfo should dispatches LOADING_USER_INFO and FETCH_USER_SUCCESS on success", async () => {
        mock.onGet(API_BASE_URL + USERS_INFO).reply(200, userData);
        await store.dispatch(fetchUserInfo());
        let expectedActions = [setUserLoadingState(LoadingStatus.LOADING), setUser(userData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("updateUserInfo should dispatches USER_UPDATED_SUCCESS on success", async () => {
        mock.onPut(API_BASE_URL + USERS_EDIT).reply(200, userData);
        await store.dispatch(updateUserInfo(userData));
        let expectedActions = [setUpdatedUser(userData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("updateUserInfo should dispatches USER_UPDATED_FAILURE on failure", async () => {
        mock.onPut(API_BASE_URL + USERS_EDIT).reply(400, userEditErrorsData);
        await store.dispatch(updateUserInfo(userData));
        let expectedActions = [userUpdatedFailure(userEditErrorsData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("updateUserPassword should dispatches USER_UPDATED_PASSWORD_SUCCESS on success", async () => {
        mock.onPut(API_BASE_URL + AUTH_EDIT_PASSWORD).reply(200, "Success");
        await store.dispatch(updateUserPassword(userResetPasswordData));
        let expectedActions = [userUpdatedPasswordSuccess("Success")];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("updateUserPassword should dispatches USER_UPDATED_PASSWORD_FAILURE on failure", async () => {
        mock.onPut(API_BASE_URL + AUTH_EDIT_PASSWORD).reply(400, authErrorsData);
        await store.dispatch(updateUserPassword(userResetPasswordData));
        let expectedActions = [userUpdatedPasswordFailure(authErrorsData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("addReviewToPerfume should dispatches FETCH_PERFUME_SUCCESS and USER_ADDED_REVIEW_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + USERS_REVIEW).reply(200, perfumeData);
        await store.dispatch(addReviewToPerfume(reviewData));
        let expectedActions = [userAddedReviewSuccess()];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("addReviewToPerfume should dispatches USER_ADDED_REVIEW_FAILURE on failure", async () => {
        mock.onPost(API_BASE_URL + USERS_REVIEW).reply(400, reviewErrorsData);
        await store.dispatch(addReviewToPerfume(reviewData));
        let expectedActions = [userAddedReviewFailure(reviewErrorsData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchUserInfoByQuery should dispatches LOADING_USER_INFO and FETCH_USER_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + USERS_GRAPHQL_INFO).reply(200, { data: { user: userData } });
        await store.dispatch(fetchUserInfoByQuery("1"));
        let expectedActions = [setUserLoadingState(LoadingStatus.LOADING), setUser(userData)];
        expect(store.getActions()).toEqual(expectedActions);
    });
});
