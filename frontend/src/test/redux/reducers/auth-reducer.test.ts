import { createStore } from "redux";

import rootReducer from "../../../redux/root-reducer";
import authReducer, { AuthState } from "../../../redux/auth/auth-reducer";
import {
    activateAccountFailure,
    activateAccountSuccess,
    forgotPasswordFailure,
    forgotPasswordSuccess,
    loginFailure,
    registerFailure,
    registerSuccess,
    resetAuthState,
    resetPasswordCodeFailure,
    resetPasswordCodeSuccess,
    resetPasswordFailure,
    resetPasswordSuccess,
    setAuthLoadingState
} from "../../../redux/auth/auth-actions";
import { authErrorsData } from "../../test-data/user-test-data";
import { LoadingStatus } from "../../../types/types";

describe("auth reducer", () => {
    const authStore = createStore(rootReducer).getState().auth;
    const error = "Incorrect password or email";
    const errors = authErrorsData;
    const success = "User successfully activated.";

    test("should Show Loader", () => {
        const state: AuthState = authReducer(authStore, setAuthLoadingState(LoadingStatus.LOADING));
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.errors).toEqual({});
    });

    test("should Login Failure", () => {
        const state: AuthState = authReducer(authStore, loginFailure(error));
        expect(state.error).toEqual(error);
    });

    test("should Register Success", () => {
        const state: AuthState = authReducer(authStore, registerSuccess());
        expect(state.isRegistered).toBeTruthy();
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.errors).toEqual({});
    });

    test("should Register Failure", () => {
        const state: AuthState = authReducer(authStore, registerFailure(errors));
        expect(state.errors).toEqual(errors);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    test("should Activate Account Success", () => {
        const state: AuthState = authReducer(authStore, activateAccountSuccess(success));
        expect(state.success).toEqual(success);
    });

    test("should Activate Account Failure", () => {
        const state: AuthState = authReducer(authStore, activateAccountFailure(error));
        expect(state.error).toEqual(error);
    });

    test("should Forgot Password Success", () => {
        const state: AuthState = authReducer(
            authStore,
            forgotPasswordSuccess("Reset password code is send to your E-mail")
        );
        expect(state.success).toEqual("Reset password code is send to your E-mail");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.errors).toEqual({});
        expect(state.error).toEqual("");
    });

    test("should Forgot Password Failure", () => {
        const state: AuthState = authReducer(authStore, forgotPasswordFailure(error));
        expect(state.error).toEqual(error);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    test("should Reset Password Code Success", () => {
        const state: AuthState = authReducer(authStore, resetPasswordCodeSuccess("test@test.com"));
        expect(state.email).toEqual("test@test.com");
    });

    test("should Reset Password Code Failure", () => {
        const state: AuthState = authReducer(authStore, resetPasswordCodeFailure(error));
        expect(state.error).toEqual(error);
    });

    test("should Reset Password Success", () => {
        const state: AuthState = authReducer(authStore, resetPasswordSuccess(success));
        expect(state.success).toEqual(success);
    });

    test("should Reset Password Failure", () => {
        const state: AuthState = authReducer(authStore, resetPasswordFailure(errors));
        expect(state.errors).toEqual(errors);
    });

    test("should Form Reset", () => {
        const state: AuthState = authReducer(authStore, resetAuthState());
        expect(state.error).toEqual("");
        expect(state.errors).toEqual({});
        expect(state.success).toEqual("");
        expect(state.isRegistered).toBeFalsy();
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });
});
