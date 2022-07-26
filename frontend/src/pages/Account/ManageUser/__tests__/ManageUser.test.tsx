import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../utils/test/testHelper";
import { LoadingStatus } from "../../../../types/types";
import Spinner from "../../../../components/Spinner/Spinner";
import {mockUserAdmin} from "../../../../utils/test/__mocks__/users-mock";
import {mockOrders} from "../../../../utils/test/__mocks__/orders-mock";
import ManageUser from "../ManageUser";

describe("ManageUser", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading spinner", () => {
        const mockRootStore = createMockRootState(LoadingStatus.LOADING);
        const mockStore = {...mockRootStore, admin: {...mockRootStore.admin, user: mockUserAdmin}};
        const wrapper = mountWithStore(<ManageUser />, mockStore);
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, expect.any(Function));
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });

    it("should render empty orders", () => {
        const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);
        const mockStore = {...mockRootStore, admin: {...mockRootStore.admin, user: mockUserAdmin}};
        const wrapper = mountWithStore(<ManageUser />, mockStore);
        expect(wrapper.text().includes(`User: ${mockUserAdmin.firstName} ${mockUserAdmin.lastName}`)).toBe(true);
        expect(wrapper.text().includes("No orders")).toBe(true);
    });

    it("should render orders items", () => {
        const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);
        const mockStore = {...mockRootStore, 
            admin: {...mockRootStore.admin, user: mockUserAdmin},
            orders: {...mockRootStore.orders, orders: mockOrders}
        };
        const wrapper = mountWithStore(<ManageUser />, mockStore);
        expect(wrapper.text().includes("Orders")).toBe(true);
        expect(wrapper.find(".ant-table-row").length).toEqual(5);
    });

    it("should unmount ManageUser", () => {
        const wrapper = mountWithStore(<ManageUser />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: "orders/resetOrders" });
        expect(mockDispatchFn).nthCalledWith(3, { payload: LoadingStatus.LOADING, type: "admin/resetAdminState" });
    });
});
