import { createStore } from "redux";

import rootReducer from "../../../redux/root-reducer";
import userReducer, { UserState } from "../../../redux/user/user-reducer";
import {
    logoutSuccess,
    resetInputForm,
    setUpdatedUser,
    setUser,
    setUserLoadingState,
    userAddedReviewFailure,
    userAddedReviewSuccess,
    userUpdatedFailure,
    userUpdatedPasswordFailure,
    userUpdatedPasswordSuccess
} from "../../../redux/user/user-actions";
import { authErrorsData, reviewErrorsData, userData, userEditErrorsData } from "../../test-data/user-test-data";
import { LoadingStatus } from "../../../types/types";

describe("user reducer", () => {
    const userStore = createStore(rootReducer).getState().user;

    test("should Loading User Info", () => {
        const state: UserState = userReducer(userStore, setUserLoadingState(LoadingStatus.LOADING));
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
    });

    test("should Fetch User Success", () => {
        const state: UserState = userReducer(userStore, setUser(userData));
        expect(state.user).toEqual(userData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    test("should User Updated Success", () => {
        const state: UserState = userReducer(userStore, setUpdatedUser(userData));
        expect(state.user).toEqual(userData);
        expect(state.userEditErrors).toEqual({});
    });

    test("should User Updated Failure", () => {
        const state: UserState = userReducer(userStore, userUpdatedFailure(userEditErrorsData));
        expect(state.userEditErrors).toEqual(userEditErrorsData);
    });

    test("should User Updated Password Success", () => {
        const state: UserState = userReducer(userStore, userUpdatedPasswordSuccess("Password successfully changed!"));
        expect(state.successMessage).toEqual("Password successfully changed!");
    });

    test("should User Updated Password Failure", () => {
        const state: UserState = userReducer(userStore, userUpdatedPasswordFailure(authErrorsData));
        expect(state.userResetPasswordErrors).toEqual(authErrorsData);
    });

    test("should User Added Review Success", () => {
        const state: UserState = userReducer(userStore, userAddedReviewSuccess());
        expect(state.reviewErrors).toEqual({});
        expect(state.isReviewAdded).toBeTruthy();
    });

    test("should User Added Review Failure", () => {
        const state: UserState = userReducer(userStore, userAddedReviewFailure(reviewErrorsData));
        expect(state.reviewErrors).toEqual(reviewErrorsData);
        expect(state.isReviewAdded).toBeFalsy();
    });

    test("should Reset Input Form", () => {
        const state: UserState = userReducer(userStore, resetInputForm());
        expect(state.userResetPasswordErrors).toEqual({});
        expect(state.successMessage).toEqual("");
        expect(state.userEditErrors).toEqual({});
        expect(state.reviewErrors).toEqual({});
    });

    test("should Logout Success", () => {
        const state: UserState = userReducer(userStore, logoutSuccess());
        expect(state.user).toEqual(undefined);
    });
});
