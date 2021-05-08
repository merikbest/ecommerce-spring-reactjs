import {createStore} from "redux";
import rootReducer from "../../../redux/reducers/root-reducer";
import authReducer, {InitialStateType} from "../../../redux/reducers/auth-reducer";
import {
    activateAccountFailure,
    activateAccountSuccess,
    forgotPasswordFailure,
    forgotPasswordSuccess,
    loginFailure,
    loginSuccess, logoutSuccess,
    registerFailure,
    registerSuccess, resetPasswordCodeFailure,
    resetPasswordCodeSuccess, resetPasswordFailure,
    resetPasswordSuccess,
    showLoader
} from "../../../redux/actions/auth-actions";
import {AuthErrors, User} from "../../../types/types";
import {authErrorsData, userData} from "../../test-data/user-test-data";
import {reset} from "../../../redux/actions/admin-actions";

let store = createStore(rootReducer);
let userRole: string;
let error: string;
let errors: AuthErrors;
let success: string;
let message: string;
let user: User;

beforeEach(() => {
    userRole = "USER";
    error = "Incorrect password or email";
    errors = authErrorsData;
    success = "User successfully activated.";
    message = "Reset password code is send to your E-mail";
    user = userData;
});

test("Show Loader", () => {
    const state: InitialStateType = authReducer(store.getState().auth, showLoader());
    expect(state.loading).toBeTruthy();
    expect(state.errors).toEqual({});
});

test("Login Success", () => {
    const state: InitialStateType = authReducer(store.getState().auth, loginSuccess(userRole));
    expect(state.userRole).toEqual(userRole);
});

test("Login Failure", () => {
    const state: InitialStateType = authReducer(store.getState().auth, loginFailure(error));
    expect(state.error).toEqual(error);
});

test("Register Success", () => {
    const state: InitialStateType = authReducer(store.getState().auth, registerSuccess());
    expect(state.isRegistered).toBeTruthy();
    expect(state.loading).toBeFalsy();
    expect(state.errors).toEqual({});
});

test("Register Failure", () => {
    const state: InitialStateType = authReducer(store.getState().auth, registerFailure(errors));
    expect(state.errors).toEqual(errors);
    expect(state.loading).toBeFalsy();
});

test("Activate Account Success", () => {
    const state: InitialStateType = authReducer(store.getState().auth, activateAccountSuccess(success));
    expect(state.success).toEqual(success);
});

test("Activate Account Failure", () => {
    const state: InitialStateType = authReducer(store.getState().auth, activateAccountFailure(error));
    expect(state.error).toEqual(error);
});

test("Forgot Password Success", () => {
    const state: InitialStateType = authReducer(store.getState().auth, forgotPasswordSuccess(message));
    expect(state.success).toEqual(message);
    expect(state.loading).toBeFalsy();
    expect(state.errors).toEqual({});
    expect(state.error).toEqual("");
});

test("Forgot Password Failure", () => {
    const state: InitialStateType = authReducer(store.getState().auth, forgotPasswordFailure(error));
    expect(state.error).toEqual(error);
    expect(state.loading).toBeFalsy();
});

test("Reset Password Code Success", () => {
    const state: InitialStateType = authReducer(store.getState().auth, resetPasswordCodeSuccess(user));
    expect(state.user).toEqual(user);
});

test("Reset Password Code Failure", () => {
    const state: InitialStateType = authReducer(store.getState().auth, resetPasswordCodeFailure(error));
    expect(state.error).toEqual(error);
});

test("Reset Password Success", () => {
    const state: InitialStateType = authReducer(store.getState().auth, resetPasswordSuccess(success));
    expect(state.success).toEqual(success);
});

test("Reset Password Failure", () => {
    const state: InitialStateType = authReducer(store.getState().auth, resetPasswordFailure(errors));
    expect(state.errors).toEqual(errors);
});

test("Logout", () => {
    const state: InitialStateType = authReducer(store.getState().auth, logoutSuccess());
    expect(state.userRole).toEqual("");
});

test("Form Reset", () => {
    const state: InitialStateType = authReducer(store.getState().auth, reset());
    expect(state.error).toEqual("");
    expect(state.errors).toEqual({});
    expect(state.success).toEqual("");
    expect(state.isRegistered).toBeFalsy();
    expect(state.loading).toBeFalsy();
});
