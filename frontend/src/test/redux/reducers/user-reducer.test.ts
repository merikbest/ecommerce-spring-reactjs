import {createStore} from "redux";
import rootReducer from "../../../redux/reducers/root-reducer";
import userReducer, {InitialStateType} from "../../../redux/reducers/user-reducer";
import {
    fetchUserByQuerySuccess,
    fetchUserSuccess,
    loadingUserInfo,
    resetInputForm,
    userAddedReviewFailure,
    userAddedReviewSuccess,
    userUpdatedFailure,
    userUpdatedPasswordFailure,
    userUpdatedPasswordSuccess,
    userUpdatedSuccess
} from "../../../redux/actions/user-actions";
import {AuthErrors, ReviewError, User, UserEditErrors} from "../../../types/types";
import {authErrorsData, reviewErrorsData, userData, userEditErrorsData} from "../../test-data/user-test-data";
import {logoutSuccess} from "../../../redux/actions/auth-actions";

let store = createStore(rootReducer);
let user: User;
let userEditErrors: UserEditErrors;
let successMessage: string;
let reviewErrors: ReviewError;
let userResetPasswordErrors: AuthErrors

beforeEach(() => {
    user = userData;
    userEditErrors = userEditErrorsData;
    successMessage = "Password successfully changed!";
    userResetPasswordErrors = authErrorsData;
    reviewErrors = reviewErrorsData;
});

test("FLoading User Info", () => {
    const state: InitialStateType = userReducer(store.getState().user, loadingUserInfo());
    expect(state.isLoaded).toBeTruthy();
});

test("Fetch User Success", () => {
    const state: InitialStateType = userReducer(store.getState().user, fetchUserSuccess(user));
    expect(state.user).toEqual(user);
    expect(state.isLoggedIn).toBeTruthy();
    expect(state.isLoaded).toBeFalsy();
});

test("User Updated Success", () => {
    const state: InitialStateType = userReducer(store.getState().user, userUpdatedSuccess(user));
    expect(state.user).toEqual(user);
    expect(state.userEditErrors).toEqual({});
});

test("User Updated Failure", () => {
    const state: InitialStateType = userReducer(store.getState().user, userUpdatedFailure(userEditErrors));
    expect(state.userEditErrors).toEqual(userEditErrors);
});

test("User Updated Password Success", () => {
    const state: InitialStateType = userReducer(store.getState().user, userUpdatedPasswordSuccess(successMessage));
    expect(state.successMessage).toEqual(successMessage);
});

test("User Updated Password Failure", () => {
    const state: InitialStateType = userReducer(store.getState().user, userUpdatedPasswordFailure(userResetPasswordErrors));
    expect(state.userResetPasswordErrors).toEqual(userResetPasswordErrors);
});

test("User Added Review Success", () => {
    const state: InitialStateType = userReducer(store.getState().user, userAddedReviewSuccess());
    expect(state.reviewErrors).toEqual({});
    expect(state.isReviewAdded).toBeTruthy();
});

test("User Added Review Failure", () => {
    const state: InitialStateType = userReducer(store.getState().user, userAddedReviewFailure(reviewErrors));
    expect(state.reviewErrors).toEqual(reviewErrors);
    expect(state.isReviewAdded).toBeFalsy();
});

test("Reset Input Form", () => {
    const state: InitialStateType = userReducer(store.getState().user, resetInputForm());
    expect(state.userResetPasswordErrors).toEqual({});
    expect(state.successMessage).toEqual("");
    expect(state.userEditErrors).toEqual({});
    expect(state.reviewErrors).toEqual({});
});

test("Logout Success", () => {
    const state: InitialStateType = userReducer(store.getState().user, logoutSuccess());
    expect(state.user).toEqual({});
    expect(state.isLoggedIn).toBeFalsy();
});

test("Fetch User Success", () => {
    const state: InitialStateType = userReducer(store.getState().user, fetchUserByQuerySuccess(user));
    expect(state.user).toEqual(user);
    expect(state.isLoggedIn).toBeTruthy();
    expect(state.isLoaded).toBeFalsy();
});
