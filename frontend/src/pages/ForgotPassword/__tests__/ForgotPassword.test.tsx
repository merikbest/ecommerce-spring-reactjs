import React from "react";
import {Alert, Input} from "antd";

import {createMockRootState, mockDispatch, mountWithStore, waitForComponentToRender} from "../../../utils/test/testHelper";
import { LoadingStatus } from "../../../types/types";
import IconButton from "../../../components/IconButton/IconButton";
import ForgotPassword from "../ForgotPassword";

describe("ForgotPassword", () => {
    const mockRootStore = createMockRootState(LoadingStatus.LOADING);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ForgotPassword />);
        expect(mockDispatchFn).nthCalledWith(1, { payload: LoadingStatus.LOADED, type: "auth/setAuthLoadingState" });
        expect(wrapper.text().includes("Enter your email address that you used to create your account.")).toBe(true);
        expect(wrapper.find(IconButton).at(0).prop("title")).toBe("Send");
    });

    it("should render error Alert message", () => {
        const mockErrorMessage = "Email not found.";
        const mockState = { ...mockRootStore, auth: { ...mockRootStore.auth, error: mockErrorMessage } };
        const wrapper = mountWithStore(<ForgotPassword />, mockState);
        expect(wrapper.find(Alert).prop("message")).toBe(mockErrorMessage);
    });

    it("should render success Alert message", () => {
        const mockSuccessMessage = "Reset password code is send to your E-mail";
        const mockState = { ...mockRootStore, auth: { ...mockRootStore.auth, success: mockSuccessMessage } };
        const wrapper = mountWithStore(<ForgotPassword />, mockState);
        expect(wrapper.find(Alert).prop("message")).toBe(mockSuccessMessage);
    });

    it("should click forgot password", async () => {
        const wrapper = mountWithStore(<ForgotPassword />, createMockRootState(LoadingStatus.LOADED));
        wrapper.find(Input).at(0).find("input").at(0).simulate("change", { target: { value: "test_email@test.com" } });
        wrapper.find(IconButton).at(0).simulate("submit");
        await waitForComponentToRender(wrapper);
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });
});
