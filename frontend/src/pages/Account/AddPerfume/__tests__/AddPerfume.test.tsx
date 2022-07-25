import React from "react";
import { Button } from "antd";

import {
    createMockRootState,
    mockDispatch,
    mountWithStore,
    waitForComponentToRender
} from "../../../../utils/test/testHelper";
import { LoadingStatus } from "../../../../types/types";
import AddPerfume from "../AddPerfume";

window.scrollTo = jest.fn();

describe("AddPerfume", () => {
    const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        mountWithStore(<AddPerfume />);
        expect(mockDispatchFn).nthCalledWith(1, { payload: LoadingStatus.LOADED, type: "admin/setAdminLoadingState" });
    });

    it("should click onFormSubmit", async () => {
        const wrapper = mountWithStore(<AddPerfume />, mockRootStore);
        wrapper.find(Button).at(0).simulate("submit");
        await waitForComponentToRender(wrapper);
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });

    it("should perfume added success", () => {
        const mockStore = {...mockRootStore, admin: {...mockRootStore.admin, isPerfumeAdded: true}};
        mountWithStore(<AddPerfume />, mockStore);
        expect(mockDispatchFn).nthCalledWith(2, { payload: LoadingStatus.SUCCESS, type: "admin/resetAdminState" });
    });

    it("should unmount AddPerfume", () => {
        const wrapper = mountWithStore(<AddPerfume />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { payload: LoadingStatus.LOADING, type: "admin/resetAdminState" });
    });
});
