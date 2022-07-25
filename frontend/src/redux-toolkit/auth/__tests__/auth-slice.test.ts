import MockAdapter from "axios-mock-adapter";
import { createMemoryHistory } from "history";
import axios from "axios";

import { store } from "../../../store";
import { initialState } from "../auth-slice";
import {
    API_BASE_URL,
    AUTH_FORGOT,
    AUTH_LOGIN,
    AUTH_RESET,
    REGISTRATION,
    REGISTRATION_ACTIVATE
} from "../../../constants/urlConstants";
import {
    authErrorsData,
    userData,
    userRegistrationData,
    userResetPasswordData
} from "../../../utils/test/__mocks__/users-mock";
import {
    activateAccount,
    fetchResetPasswordCode,
    forgotPassword,
    login,
    registration,
    resetPassword
} from "../auth-thunks";
import { ACCOUNT, LOGIN } from "../../../constants/routeConstants";
import { LoadingStatus } from "../../../types/types";

describe("auth slice tests", () => {
    const mock = new MockAdapter(axios);
    const mockTestCode = "test_code";
    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, "push");
    let state = store.getState().auth;

    beforeEach(() => {
        state = initialState;
    });

    it("should login success", async () => {
        mock.onPost(API_BASE_URL + AUTH_LOGIN).reply(200, { user: userData, token: "test_token" });
        const result = await store.dispatch(
            login({
                userData: { email: "test123@test.com", password: "test123" },
                history
            })
        );

        expect(localStorage.getItem("token")).toEqual("test_token");
        expect(result.type).toBe("auth/login/fulfilled");
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(ACCOUNT);
        expect(store.getState().user.user).toEqual(userData);
    });

    it("should login dispatches rejected on failure", async () => {
        expect(state.error).toEqual("");
        mock.onPost(API_BASE_URL + AUTH_LOGIN).reply(400, "Incorrect password or email");
        const result = await store.dispatch(
            login({
                userData: { email: "test123@test.com", password: "test123" },
                history: createMemoryHistory()
            })
        );

        state = store.getState().auth;
        expect(result.type).toBe("auth/login/rejected");
        expect(state.error).toEqual("Incorrect password or email");
    });

    it("should registration dispatches fulfilled on success", async () => {
        expect(state.isRegistered).toEqual(false);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + REGISTRATION).reply(200);
        const result = await store.dispatch(registration(userRegistrationData));

        state = store.getState().auth;
        expect(result.type).toBe("auth/registration/fulfilled");
        expect(state.isRegistered).toEqual(true);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should registration dispatches rejected on failure", async () => {
        expect(state.errors).toEqual({});
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + REGISTRATION).reply(400, authErrorsData);
        const result = await store.dispatch(registration(userRegistrationData));

        state = store.getState().auth;
        expect(result.type).toBe("auth/registration/rejected");
        expect(state.errors).toEqual(authErrorsData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should activateAccount dispatches fulfilled on success", async () => {
        expect(state.success).toEqual("");

        mock.onGet(API_BASE_URL + `${REGISTRATION_ACTIVATE}/${mockTestCode}`).reply(
            200,
            "User successfully activated."
        );
        const result = await store.dispatch(activateAccount(mockTestCode));

        state = store.getState().auth;
        expect(result.type).toBe("auth/activateAccount/fulfilled");
        expect(state.success).toEqual("User successfully activated.");
    });

    it("should activateAccount dispatches rejected on failure", async () => {
        expect(state.error).toEqual("");

        mock.onGet(API_BASE_URL + `${REGISTRATION_ACTIVATE}/${mockTestCode}`).reply(404, "Activation code not found.");
        const result = await store.dispatch(activateAccount(mockTestCode));

        state = store.getState().auth;
        expect(result.type).toBe("auth/activateAccount/rejected");
        expect(state.error).toEqual("Activation code not found.");
    });

    it("should forgotPassword dispatches fulfilled on success", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${AUTH_FORGOT}/test123@test.com`).reply(
            200,
            "Reset password code is send to your E-mail"
        );
        const result = await store.dispatch(forgotPassword("test123@test.com"));

        state = store.getState().auth;
        expect(result.type).toBe("auth/forgotPassword/fulfilled");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.success).toEqual("Reset password code is send to your E-mail");
    });

    it("should forgotPassword dispatches rejected on failure", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.error).toEqual("");

        mock.onGet(API_BASE_URL + `${AUTH_FORGOT}/test123@test.com`).reply(400, "Email not found");
        const result = await store.dispatch(forgotPassword("test123@test.com"));

        state = store.getState().auth;
        expect(result.type).toBe("auth/forgotPassword/rejected");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.error).toEqual("Email not found");
    });

    it("should fetchResetPasswordCode dispatches fulfilled on success", async () => {
        expect(state.email).toEqual("");

        mock.onGet(API_BASE_URL + `${AUTH_RESET}/${mockTestCode}`).reply(200, "test@test.com");
        const result = await store.dispatch(fetchResetPasswordCode(mockTestCode));

        state = store.getState().auth;
        expect(result.type).toBe("auth/fetchResetPasswordCode/fulfilled");
        expect(state.email).toEqual("test@test.com");
    });

    it("should fetchResetPasswordCode dispatches rejected on failure", async () => {
        expect(state.error).toEqual("");

        mock.onGet(API_BASE_URL + `${AUTH_RESET}/${mockTestCode}`).reply(400, "Password reset code is invalid!");
        const result = await store.dispatch(fetchResetPasswordCode(mockTestCode));

        state = store.getState().auth;
        expect(result.type).toBe("auth/fetchResetPasswordCode/rejected");
        expect(state.error).toEqual("Password reset code is invalid!");
    });

    it("should resetPassword dispatches fulfilled on success", async () => {
        expect(state.success).toEqual("");

        mock.onPost(API_BASE_URL + AUTH_RESET).reply(200, "Password successfully changed!");
        const result = await store.dispatch(resetPassword({ request: userResetPasswordData, history }));

        state = store.getState().auth;
        expect(result.type).toBe("auth/resetPassword/fulfilled");
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(LOGIN);
        expect(state.success).toEqual("Password successfully changed!");
    });

    it("should resetPassword dispatches rejected on failure", async () => {
        expect(state.errors).toEqual({});

        mock.onPost(API_BASE_URL + AUTH_RESET).reply(400, authErrorsData);
        const result = await store.dispatch(resetPassword({ request: userResetPasswordData, history }));

        state = store.getState().auth;
        expect(result.type).toBe("auth/resetPassword/rejected");
        expect(state.errors).toEqual(authErrorsData);
    });
});
