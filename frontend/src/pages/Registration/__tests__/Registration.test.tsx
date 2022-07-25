import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../utils/test/testHelper";
import { LoadingStatus } from "../../../types/types";
import Registration from "../Registration";

window.scrollTo = jest.fn();

describe("Registration", () => {
    const mockRootStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        mountWithStore(<Registration />);
        expect(mockDispatchFn).nthCalledWith(1, { payload: LoadingStatus.LOADED, type: "auth/setAuthLoadingState" });
    });

    it("should reset Captcha Value", () => {
        const mockStore = {
            ...mockRootStore,
            auth: { ...mockRootStore.auth, isRegistered: true }
        };
        mountWithStore(<Registration />, mockStore);
    });

    it("should unmount Registration", () => {
        const wrapper = mountWithStore(<Registration />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: "auth/resetAuthState" });
    });
});
