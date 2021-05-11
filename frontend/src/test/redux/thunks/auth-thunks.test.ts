import thunk, {ThunkDispatch} from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {AnyAction} from "redux";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {InitialStateType} from "../../../redux/reducers/auth-reducer";
import {API_BASE_URL} from "../../../utils/constants/url";
import {
    activateAccount,
    fetchResetPasswordCode,
    forgotPassword,
    login,
    logout,
    registration,
    resetPassword
} from "../../../redux/thunks/auth-thunks";
import {useHistory} from "react-router-dom";
import {
    activateAccountFailure,
    activateAccountSuccess,
    forgotPasswordFailure,
    forgotPasswordSuccess,
    loginFailure,
    loginSuccess,
    logoutSuccess,
    registerFailure,
    registerSuccess,
    resetPasswordCodeFailure,
    resetPasswordCodeSuccess,
    resetPasswordFailure,
    resetPasswordSuccess,
    showLoader
} from "../../../redux/actions/auth-actions";
import {authErrorsData, userData, userRegistrationData, userResetPasswordData} from "../../test-data/user-test-data";

const middlewares = [thunk];
const mockStore = configureMockStore<InitialStateType, ThunkDispatch<InitialStateType, void, AnyAction>>(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        push: jest.fn()
    })
}));

describe("auth actions", () => {

    beforeEach(() => {
        store.clearActions();
    });

    test("login should dispatches LOGIN_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/auth/login").reply(200, {
            "email": "test123@test.com",
            "token": "test_token",
            "userRole": "USER",
            "isLoggedIn": "true"
        });
        await store.dispatch(login({"email": "test123@test.com", "password": "test123"}, useHistory()));
        let expectedActions = [loginSuccess("USER")];
        expect(store.getActions()).toEqual(expectedActions);
        expect(localStorage.getItem("email")).toEqual("test123@test.com");
        expect(localStorage.getItem("token")).toEqual("test_token");
        expect(localStorage.getItem("userRole")).toEqual("USER");
        expect(localStorage.getItem("isLoggedIn")).toEqual("true");
    });

    test("login should dispatches LOGIN_FAILURE on failure", async () => {
        mock.onPost(API_BASE_URL + "/auth/login").reply(400, "Incorrect password or email");
        await store.dispatch(login({"email": "test123@test.com", "password": "test123"}, useHistory()));
        let expectedActions = [loginFailure("Incorrect password or email")];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("registration should dispatches REGISTER_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/registration").reply(200);
        await store.dispatch(registration(userRegistrationData));
        let expectedActions = [showLoader(), registerSuccess()];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("registration should dispatches REGISTER_FAILURE on failure", async () => {
        mock.onPost(API_BASE_URL + "/registration").reply(400, authErrorsData);
        await store.dispatch(registration(userRegistrationData));
        let expectedActions = [showLoader(), registerFailure(authErrorsData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("logout should dispatches LOGOUT_SUCCESS on success", () => {
        store.dispatch(logout());
        let expectedActions = [logoutSuccess()];
        expect(store.getActions()).toEqual(expectedActions);
        expect(localStorage.getItem("email")).toEqual(null);
        expect(localStorage.getItem("token")).toEqual(null);
        expect(localStorage.getItem("userRole")).toEqual(null);
        expect(localStorage.getItem("isLoggedIn")).toEqual(null);
    });

    test("activateAccount should dispatches ACTIVATE_ACCOUNT_SUCCESS on success", async () => {
        mock.onGet(API_BASE_URL + "/registration/activate/test_code").reply(200, "User successfully activated.");
        await store.dispatch(activateAccount("test_code"));
        let expectedActions = [activateAccountSuccess("User successfully activated.")];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("activateAccount should dispatches ACTIVATE_ACCOUNT_FAILURE on failure", async () => {
        mock.onGet(API_BASE_URL + "/registration/activate/test_code").reply(404, "Activation code not found.");
        await store.dispatch(activateAccount("test_code"));
        let expectedActions = [activateAccountFailure("Activation code not found.")];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("forgotPassword should dispatches SHOW_LOADER and FORGOT_PASSWORD_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/auth/forgot").reply(200, "Reset password code is send to your E-mail");
        await store.dispatch(forgotPassword({email: "test123@test.com"}));
        let expectedActions = [showLoader(), forgotPasswordSuccess("Reset password code is send to your E-mail")];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("forgotPassword should dispatches SHOW_LOADER and FORGOT_PASSWORD_FAILURE on failure", async () => {
        mock.onPost(API_BASE_URL + "/auth/forgot").reply(400, "Email not found");
        await store.dispatch(forgotPassword({email: "test123@test.com"}));
        let expectedActions = [showLoader(), forgotPasswordFailure("Email not found")];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchResetPasswordCode should dispatches RESET_PASSWORD_CODE_SUCCESS on success", async () => {
        mock.onGet(API_BASE_URL + "/auth/reset/test_code").reply(200, userData);
        await store.dispatch(fetchResetPasswordCode("test_code"));
        let expectedActions = [resetPasswordCodeSuccess(userData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchResetPasswordCode should dispatches RESET_PASSWORD_CODE_FAILURE on failure", async () => {
        mock.onGet(API_BASE_URL + "/auth/reset/test_code").reply(400, "Password reset code is invalid!");
        await store.dispatch(fetchResetPasswordCode("test_code"));
        let expectedActions = [resetPasswordCodeFailure("Password reset code is invalid!")];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("resetPassword should dispatches RESET_PASSWORD_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/auth/reset").reply(200, "Password successfully changed!");
        await store.dispatch(resetPassword(userResetPasswordData, useHistory()));
        let expectedActions = [resetPasswordSuccess("Password successfully changed!")];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("resetPassword should dispatches RESET_PASSWORD_FAILURE on failure", async () => {
        mock.onPost(API_BASE_URL + "/auth/reset").reply(400, authErrorsData);
        await store.dispatch(resetPassword(userResetPasswordData, useHistory()));
        let expectedActions = [resetPasswordFailure(authErrorsData)];
        expect(store.getActions()).toEqual(expectedActions);
    });
});
