import React from "react";
import { Button, Form } from "antd";

import {
    createMockRootState,
    mockDispatch,
    mountWithStore,
    waitForComponentToRender
} from "../../../../utils/test/testHelper";
import { LoadingStatus } from "../../../../types/types";
import { mockUserAdmin } from "../../../../utils/test/__mocks__/users-mock";
import PersonalData from "../PersonalData";

describe("PersonalData", () => {
    const mockRootStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const mockStore = { ...mockRootStore, user: { ...mockRootStore.user, user: mockUserAdmin } };
        mountWithStore(<PersonalData />, mockStore);
        expect(mockDispatchFn).nthCalledWith(1, { type: "user/resetInputForm" });
    });

    it("should onClickShowUserData", () => {
        const wrapper = mountWithStore(<PersonalData />);
        expect(wrapper.find(Form).exists()).toBeFalsy();
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(Form).exists()).toBeTruthy();
    });

    it("should onFormSubmit", async () => {
        const wrapper = mountWithStore(<PersonalData />);
        wrapper.find(Button).at(0).simulate("click");
        wrapper.find(Button).at(1).simulate("submit");
        await waitForComponentToRender(wrapper);
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });
});
