import React from "react";
import { Table } from "antd";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../utils/test/testHelper";
import { LoadingStatus } from "../../../../types/types";
import { mockBaseUsersResponse } from "../../../../utils/test/__mocks__/users-mock";
import UsersList from "../UsersList";

describe("UsersList", () => {
    const mockRootStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading", () => {
        const wrapper = mountWithStore(<UsersList />);
        expect(wrapper.find(Table).prop("loading")).toBe(true);
    });

    it("should render correctly", () => {
        const mockStore = {
            ...mockRootStore,
            admin: { ...mockRootStore.admin, users: mockBaseUsersResponse, totalElements: 1 }
        };
        const wrapper = mountWithStore(<UsersList />, mockStore);
        expect(mockDispatchFn).nthCalledWith(1, expect.any(Function));
        expect(wrapper.find(Table).prop("loading")).toBe(false);
        expect(wrapper.find(".ant-table-row").length).toEqual(1);
    });

    it("should unmount UsersList", () => {
        const wrapper = mountWithStore(<UsersList />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { payload: LoadingStatus.LOADING, type: "admin/resetAdminState" });
    });
});
