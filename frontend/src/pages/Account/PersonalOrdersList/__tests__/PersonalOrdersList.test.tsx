import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../utils/test/testHelper";
import { LoadingStatus } from "../../../../types/types";
import Spinner from "../../../../components/Spinner/Spinner";
import { mockOrders } from "../../../../utils/test/__mocks__/orders-mock";
import OrdersTable from "../../../../components/OrdersTable/OrdersTable";
import PersonalOrdersList from "../PersonalOrdersList";

describe("PersonalOrdersList", () => {
    const mockRootStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading spinner", () => {
        const wrapper = mountWithStore(<PersonalOrdersList />);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render correctly", () => {
        const mockStore = { ...mockRootStore, orders: { ...mockRootStore.orders, orders: mockOrders } };
        const wrapper = mountWithStore(<PersonalOrdersList />, mockStore);
        expect(mockDispatchFn).nthCalledWith(1, expect.any(Function));
        expect(wrapper.text().includes("List of all orders")).toBe(true);
        expect(wrapper.find(OrdersTable).exists()).toBeTruthy();
    });

    it("should render empty orders", () => {
        const wrapper = mountWithStore(<PersonalOrdersList />, mockRootStore);
        expect(wrapper.text().includes("You have no orders")).toBe(true);
    });

    it("should unmount PersonalOrdersList", () => {
        const wrapper = mountWithStore(<PersonalOrdersList />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: "orders/resetOrders" });
    });
});
