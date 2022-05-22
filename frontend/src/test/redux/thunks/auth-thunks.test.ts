import thunk, { ThunkDispatch } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { AnyAction } from "redux";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { AuthState } from "../../../redux/auth/auth-reducer";
import {
    API_BASE_URL,
    AUTH_FORGOT,
    AUTH_LOGIN,
    AUTH_RESET,
    REGISTRATION,
    REGISTRATION_ACTIVATE
} from "../../../constants/urlConstants";
import {
    activateAccount,
    fetchResetPasswordCode,
    forgotPassword,
    login,
    registration,
    resetPassword
} from "../../../redux/auth/auth-thunks";
import {
    activateAccountFailure,
    activateAccountSuccess,
    forgotPasswordFailure,
    forgotPasswordSuccess,
    loginFailure,
    registerFailure,
    registerSuccess,
    resetPasswordCodeFailure,
    resetPasswordCodeSuccess,
    resetPasswordFailure,
    resetPasswordSuccess,
    setAuthLoadingState
} from "../../../redux/auth/auth-actions";
import { authErrorsData, userData, userRegistrationData, userResetPasswordData } from "../../test-data/user-test-data";
import { LoadingStatus } from "../../../types/types";
import { setUser } from "../../../redux/user/user-actions";

const middlewares = [thunk];
const mockStore = configureMockStore<AuthState, ThunkDispatch<AuthState, void, AnyAction>>(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        push: jest.fn()
    })
}));

describe("auth actions", () => {
    const mockTestCode = "test_code";

    beforeEach(() => {
        store.clearActions();
    });

    test("login should dispatches LOGIN_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + AUTH_LOGIN).reply(200, {
            user: userData,
            token: "test_token"
        });
        await store.dispatch(login({ email: "test123@test.com", password: "test123" }, useHistory()));
        let expectedActions = [setUser(userData)];
        expect(store.getActions()).toEqual(expectedActions);
        expect(localStorage.getItem("token")).toEqual("test_token");
    });

    test("login should dispatches LOGIN_FAILURE on failure", async () => {
        mock.onPost(API_BASE_URL + AUTH_LOGIN).reply(400, "Incorrect password or email");
        await store.dispatch(login({ email: "test123@test.com", password: "test123" }, useHistory()));
        let expectedActions = [loginFailure("Incorrect password or email")];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("registration should dispatches REGISTER_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + REGISTRATION).reply(200);
        await store.dispatch(registration(userRegistrationData));
        let expectedActions = [setAuthLoadingState(LoadingStatus.LOADING), registerSuccess()];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("registration should dispatches REGISTER_FAILURE on failure", async () => {
        mock.onPost(API_BASE_URL + REGISTRATION).reply(400, authErrorsData);
        await store.dispatch(registration(userRegistrationData));
        let expectedActions = [setAuthLoadingState(LoadingStatus.LOADING), registerFailure(authErrorsData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("activateAccount should dispatches ACTIVATE_ACCOUNT_SUCCESS on success", async () => {
        mock.onGet(API_BASE_URL + `${REGISTRATION_ACTIVATE}/${mockTestCode}`).reply(
            200,
            "User successfully activated."
        );
        await store.dispatch(activateAccount(mockTestCode));
        let expectedActions = [activateAccountSuccess("User successfully activated.")];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("activateAccount should dispatches ACTIVATE_ACCOUNT_FAILURE on failure", async () => {
        mock.onGet(API_BASE_URL + `${REGISTRATION_ACTIVATE}/${mockTestCode}`).reply(404, "Activation code not found.");
        await store.dispatch(activateAccount(mockTestCode));
        let expectedActions = [activateAccountFailure("Activation code not found.")];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("forgotPassword should dispatches SHOW_LOADER and FORGOT_PASSWORD_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + AUTH_FORGOT).reply(200, "Reset password code is send to your E-mail");
        await store.dispatch(forgotPassword({ email: "test123@test.com" }));
        let expectedActions = [
            setAuthLoadingState(LoadingStatus.LOADING),
            forgotPasswordSuccess("Reset password code is send to your E-mail")
        ];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("forgotPassword should dispatches SHOW_LOADER and FORGOT_PASSWORD_FAILURE on failure", async () => {
        mock.onPost(API_BASE_URL + AUTH_FORGOT).reply(400, "Email not found");
        await store.dispatch(forgotPassword({ email: "test123@test.com" }));
        let expectedActions = [setAuthLoadingState(LoadingStatus.LOADING), forgotPasswordFailure("Email not found")];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchResetPasswordCode should dispatches RESET_PASSWORD_CODE_SUCCESS on success", async () => {
        mock.onGet(API_BASE_URL + `${AUTH_RESET}/${mockTestCode}`).reply(200, "test@test.com");
        await store.dispatch(fetchResetPasswordCode(mockTestCode));
        let expectedActions = [resetPasswordCodeSuccess("test@test.com")];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchResetPasswordCode should dispatches RESET_PASSWORD_CODE_FAILURE on failure", async () => {
        mock.onGet(API_BASE_URL + `${AUTH_RESET}/${mockTestCode}`).reply(400, "Password reset code is invalid!");
        await store.dispatch(fetchResetPasswordCode(mockTestCode));
        let expectedActions = [resetPasswordCodeFailure("Password reset code is invalid!")];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("resetPassword should dispatches RESET_PASSWORD_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + AUTH_RESET).reply(200, "Password successfully changed!");
        await store.dispatch(resetPassword(userResetPasswordData, useHistory()));
        let expectedActions = [resetPasswordSuccess("Password successfully changed!")];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("resetPassword should dispatches RESET_PASSWORD_FAILURE on failure", async () => {
        mock.onPost(API_BASE_URL + AUTH_RESET).reply(400, authErrorsData);
        await store.dispatch(resetPassword(userResetPasswordData, useHistory()));
        let expectedActions = [resetPasswordFailure(authErrorsData)];
        expect(store.getActions()).toEqual(expectedActions);
    });
});
