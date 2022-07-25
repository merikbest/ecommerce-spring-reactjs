import React from "react";
import { Alert, Button } from "antd";

import {
    createMockRootState,
    mockDispatch,
    mountWithStore,
    waitForComponentToRender
} from "../../../../utils/test/testHelper";
import { LoadingStatus } from "../../../../types/types";
import ChangePassword from "../ChangePassword";

describe("ChangePassword", () => {
    const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const mockStore = { ...mockRootStore, user: { ...mockRootStore.user, successMessage: "test_message" } };
        const wrapper = mountWithStore(<ChangePassword />, mockStore);
        expect(mockDispatchFn).nthCalledWith(1, { type: "user/resetInputForm" });
        expect(wrapper.find(Alert).prop("message")).toBe("test_message");
    });

    it("should click onFormSubmit", async () => {
        const wrapper = mountWithStore(<ChangePassword />);
        wrapper.find(Button).simulate("submit");
        await waitForComponentToRender(wrapper);
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });
});
