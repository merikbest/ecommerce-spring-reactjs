import React from "react";
import ReactRouter from "react-router";
import { Alert } from "antd";

import {createMockRootState, mockDispatch, mountWithStore, waitForComponentToRender} from "../../../utils/test/testHelper";
import { LoadingStatus } from "../../../types/types";
import IconButton from "../../../components/IconButton/IconButton";
import ResetPassword from "../ResetPassword";

describe("ResetPassword", () => {
    const mockRootStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ code: "test" });
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        mountWithStore(<ResetPassword />);
        expect(mockDispatchFn).nthCalledWith(1, { type: "auth/resetAuthState" });
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });

    it("should render error Alert message", () => {
        const mockErrorMessage = "Password reset code is invalid!";
        const mockStore = {
            ...mockRootStore,
            auth: { ...mockRootStore.auth, error: mockErrorMessage }
        };
        const wrapper = mountWithStore(<ResetPassword />, mockStore);
        expect(wrapper.find(Alert).prop("message")).toBe(mockErrorMessage);
    });

    it("should onClickReset", async () => {
        const wrapper = mountWithStore(<ResetPassword />);
        wrapper.find(IconButton).at(0).simulate("submit");
        await waitForComponentToRender(wrapper);
    });
});
