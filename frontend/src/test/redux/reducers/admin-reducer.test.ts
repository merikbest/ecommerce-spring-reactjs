import { createStore } from "redux";

import rootReducer from "../../../redux/root-reducer";
import adminReducer, { AdminState } from "../../../redux/admin/admin-reducer";
import {
    addPerfumeFailure,
    addPerfumeSuccess,
    resetAdminState,
    setAdminLoadingState,
    setAllUsers,
    setUserInfo,
    updatePerfumeFailure,
    updatePerfumeSuccess
} from "../../../redux/admin/admin-actions";
import { perfumeErrorData } from "../../test-data/perfume-test-data";
import { userData, usersData } from "../../test-data/user-test-data";
import { LoadingStatus } from "../../../types/types";

describe("admin reducer", () => {
    const adminStore = createStore(rootReducer).getState().admin;

    test("should Loading Data", () => {
        const state: AdminState = adminReducer(adminStore, setAdminLoadingState(LoadingStatus.LOADING));
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
    });

    test("should Perfume Added Success", () => {
        const state: AdminState = adminReducer(adminStore, addPerfumeSuccess());
        expect(state.isPerfumeAdded).toBeTruthy();
        expect(state.errors).toEqual({});
    });

    test("should Perfume Added Failure", () => {
        const state: AdminState = adminReducer(adminStore, addPerfumeFailure(perfumeErrorData));
        expect(state.isPerfumeAdded).toBeFalsy();
        expect(state.errors).toEqual(perfumeErrorData);
    });

    test("should Perfume Updated Success", () => {
        const state: AdminState = adminReducer(adminStore, updatePerfumeSuccess());
        expect(state.isPerfumeEdited).toBeTruthy();
        expect(state.errors).toEqual({});
    });

    test("should Perfume Updated Failure", () => {
        const state: AdminState = adminReducer(adminStore, updatePerfumeFailure(perfumeErrorData));
        expect(state.isPerfumeEdited).toBeFalsy();
        expect(state.errors).toEqual(perfumeErrorData);
    });

    test("should Fetch User Info Success", () => {
        const state: AdminState = adminReducer(adminStore, setUserInfo(userData));
        expect(state.user).toEqual(userData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    test("should Fetch All Users Success", () => {
        const state: AdminState = adminReducer(adminStore, setAllUsers(usersData));
        expect(state.users).toEqual(usersData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    test("should Form Reset", () => {
        const state: AdminState = adminReducer(adminStore, resetAdminState());
        expect(state.isPerfumeAdded).toBeFalsy();
        expect(state.isPerfumeEdited).toBeFalsy();
        expect(state.errors).toEqual({});
    });
});
