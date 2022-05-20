import {createStore} from "redux";

import rootReducer from "../../../redux/root-reducer";
import authReducer, {AuthState} from "../../../redux/auth/auth-reducer";
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
} from "../../../redux/auth/auth-actions";
import {authErrorsData, userData} from "../../test-data/user-test-data";
import {reset} from "../../../redux/admin/admin-actions";

describe("auth reducer", () => {
    const authStore = createStore(rootReducer).getState().auth;
    const error = "Incorrect password or email";
    const errors = authErrorsData;
    const success = "User successfully activated.";
    
    test("should Show Loader", () => {
        const state: AuthState = authReducer(authStore, showLoader());
        expect(state.loading).toBeTruthy();
        expect(state.errors).toEqual({});
    });

    test("should Login Success", () => {
        const state: AuthState = authReducer(authStore, loginSuccess("USER"));
        expect(state.userRole).toEqual("USER");
    });

    test("should Login Failure", () => {
        const state: AuthState = authReducer(authStore, loginFailure(error));
        expect(state.error).toEqual(error);
    });

    test("should Register Success", () => {
        const state: AuthState = authReducer(authStore, registerSuccess());
        expect(state.isRegistered).toBeTruthy();
        expect(state.loading).toBeFalsy();
        expect(state.errors).toEqual({});
    });

    test("should Register Failure", () => {
        const state: AuthState = authReducer(authStore, registerFailure(errors));
        expect(state.errors).toEqual(errors);
        expect(state.loading).toBeFalsy();
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
        const state: AuthState = authReducer(authStore, forgotPasswordSuccess("Reset password code is send to your E-mail"));
        expect(state.success).toEqual("Reset password code is send to your E-mail");
        expect(state.loading).toBeFalsy();
        expect(state.errors).toEqual({});
        expect(state.error).toEqual("");
    });

    test("should Forgot Password Failure", () => {
        const state: AuthState = authReducer(authStore, forgotPasswordFailure(error));
        expect(state.error).toEqual(error);
        expect(state.loading).toBeFalsy();
    });

    test("should Reset Password Code Success", () => {
        const state: AuthState = authReducer(authStore, resetPasswordCodeSuccess(userData));
        expect(state.user).toEqual(userData);
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

    test("should Logout", () => {
        const state: AuthState = authReducer(authStore, logoutSuccess());
        expect(state.userRole).toEqual("");
    });

    test("should Form Reset", () => {
        const state: AuthState = authReducer(authStore, reset());
        expect(state.error).toEqual("");
        expect(state.errors).toEqual({});
        expect(state.success).toEqual("");
        expect(state.isRegistered).toBeFalsy();
        expect(state.loading).toBeFalsy();
    });
});
