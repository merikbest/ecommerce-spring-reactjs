import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { LoadingStatus } from "../../../types/types";
import {
    API_BASE_URL,
    AUTH_EDIT_PASSWORD,
    USERS_EDIT,
    USERS_GRAPHQL_INFO,
    USERS_INFO,
    USERS_REVIEW
} from "../../../constants/urlConstants";
import { mockFullPerfumeResponse } from "../../../utils/test/__mocks__/perfumes-mock";
import { store } from "../../../store";
import { initialState } from "../user-slice";
import {
    authErrorsData,
    reviewData,
    reviewErrorsData,
    userData,
    userEditErrorsData,
    userResetPasswordData
} from "../../../utils/test/__mocks__/users-mock";
import {
    addReviewToPerfume,
    fetchUserInfo,
    fetchUserInfoByQuery,
    updateUserInfo,
    updateUserPassword
} from "../user-thunks";

describe("user slice tests", () => {
    const mock = new MockAdapter(axios);
    let state = store.getState().user;

    beforeEach(() => {
        state = initialState;
    });

    it("should fetchUserInfo dispatches fulfilled on success", async () => {
        expect(state.user).toEqual(undefined);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + USERS_INFO).reply(200, userData);
        const result = await store.dispatch(fetchUserInfo());

        state = store.getState().user;
        expect(result.type).toBe("user/fetchUserInfo/fulfilled");
        expect(state.user).toEqual(userData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should updateUserInfo dispatches fulfilled on success", async () => {
        expect(state.user).toEqual(undefined);

        mock.onPut(API_BASE_URL + USERS_EDIT).reply(200, userData);
        const result = await store.dispatch(updateUserInfo(userData));

        state = store.getState().user;
        expect(result.type).toBe("user/updateUserInfo/fulfilled");
        expect(state.user).toEqual(userData);
    });

    it("should updateUserInfo dispatches rejected on failure", async () => {
        expect(state.userEditErrors).toEqual({});

        mock.onPut(API_BASE_URL + USERS_EDIT).reply(400, userEditErrorsData);
        const result = await store.dispatch(updateUserInfo(userData));

        state = store.getState().user;
        expect(result.type).toBe("user/updateUserInfo/rejected");
        expect(state.userEditErrors).toEqual(userEditErrorsData);
    });

    it("should updateUserPassword dispatches fulfilled on success", async () => {
        expect(state.successMessage).toEqual("");

        mock.onPut(API_BASE_URL + AUTH_EDIT_PASSWORD).reply(200, "Success");
        const result = await store.dispatch(updateUserPassword(userResetPasswordData));

        state = store.getState().user;
        expect(result.type).toBe("user/updateUserPassword/fulfilled");
        expect(state.successMessage).toEqual("Success");
    });

    it("should updateUserPassword dispatches rejected on failure", async () => {
        expect(state.userResetPasswordErrors).toEqual({});

        mock.onPut(API_BASE_URL + AUTH_EDIT_PASSWORD).reply(400, authErrorsData);
        const result = await store.dispatch(updateUserPassword(userResetPasswordData));

        state = store.getState().user;
        expect(result.type).toBe("user/updateUserPassword/rejected");
        expect(state.userResetPasswordErrors).toEqual(authErrorsData);
    });

    it("should addReviewToPerfume dispatches fulfilled on success", async () => {
        expect(state.isReviewAdded).toEqual(false);

        mock.onPost(API_BASE_URL + USERS_REVIEW).reply(200, mockFullPerfumeResponse);
        const result = await store.dispatch(addReviewToPerfume(reviewData));

        state = store.getState().user;
        expect(result.type).toBe("user/addReviewToPerfume/fulfilled");
        expect(state.isReviewAdded).toEqual(true);
    });

    it("should addReviewToPerfume dispatches rejected on failure", async () => {
        expect(state.reviewErrors).toEqual({});

        mock.onPost(API_BASE_URL + USERS_REVIEW).reply(400, reviewErrorsData);
        const result = await store.dispatch(addReviewToPerfume(reviewData));

        state = store.getState().user;
        expect(result.type).toBe("user/addReviewToPerfume/rejected");
        expect(state.reviewErrors).toEqual(reviewErrorsData);
    });

    it("should fetchUserInfoByQuery dispatches fulfilled on success", async () => {
        expect(state.user).toEqual(undefined);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + USERS_GRAPHQL_INFO).reply(200, { data: { user: userData } });
        const result = await store.dispatch(fetchUserInfoByQuery("1"));

        state = store.getState().user;
        expect(result.type).toBe("user/fetchUserInfoByQuery/fulfilled");
        expect(state.user).toEqual(userData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });
});
