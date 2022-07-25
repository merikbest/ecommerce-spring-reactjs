import React from "react";
import ReactRouter from "react-router";
import { Alert, Input } from "antd";
import { createMemoryHistory } from "history";
import { Link } from "react-router-dom";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../utils/test/testHelper";
import { LoadingStatus } from "../../../types/types";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import IconButton from "../../../components/IconButton/IconButton";
import SocialButton from "../SocialButton/SocialButton";
import { FORGOT } from "../../../constants/routeConstants";
import Login from "../Login";

window.scrollTo = jest.fn();

describe("Login", () => {
    const mockRootStore = createMockRootState(LoadingStatus.LOADING);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ code: "test" });
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Login />);
        expect(mockDispatchFn).nthCalledWith(1, expect.any(Function));
        expect(wrapper.find(ContentTitle).at(0).prop("title")).toBe("SIGN IN");
        expect(wrapper.find(IconButton).at(0).prop("title")).toBe("Sign in");
        expect(wrapper.find(SocialButton).length).toEqual(3);
    });

    it("should render error message", () => {
        const mockErrorMessage = "Incorrect password or email";
        const mockState = { ...mockRootStore, auth: { ...mockRootStore.auth, error: mockErrorMessage } };
        const wrapper = mountWithStore(<Login />, mockState);
        expect(wrapper.find(Alert).prop("message")).toBe(mockErrorMessage);
    });

    it("should render success message", () => {
        const mockSuccessMessage = "Password successfully changed!";
        const mockState = { ...mockRootStore, user: { ...mockRootStore.user, successMessage: mockSuccessMessage } };
        const wrapper = mountWithStore(<Login />, mockState);
        expect(wrapper.find(Alert).prop("message")).toBe(mockSuccessMessage);
    });

    it("should click login", () => {
        const wrapper = mountWithStore(<Login />);
        wrapper.find(Input).at(0).find("input").at(0).simulate("change", { target: { value: "test_email@test.com" } });
        wrapper.find(Input).at(1).find("input").at(0).simulate("change", { target: { value: "test_password" } });
        wrapper.find(IconButton).at(0).simulate("submit");
    });

    it("should click Forgot password Link", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<Login />, mockRootStore, history);
        wrapper.find(Link).simulate("click", { button: 0 });
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(FORGOT);
    });

    it("should unmount Login", () => {
        const wrapper = mountWithStore(<Login />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: "auth/resetAuthState" });
    });
});
