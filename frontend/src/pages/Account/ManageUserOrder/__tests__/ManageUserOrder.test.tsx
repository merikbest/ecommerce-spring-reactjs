import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../utils/test/testHelper";
import { LoadingStatus } from "../../../../types/types";
import Spinner from "../../../../components/Spinner/Spinner";
import { mockOrder, mockOrderItems } from "../../../../utils/test/__mocks__/orders-mock";
import ManageUserOrder from "../ManageUserOrder";

describe("ManageUserOrder", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading spinner", () => {
        const wrapper = mountWithStore(<ManageUserOrder />);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render correctly", () => {
        const mockRootStore = createMockRootState(LoadingStatus.LOADED);
        const mockStore = {
            ...mockRootStore,
            order: { ...mockRootStore.orders, order: mockOrder, orderItems: mockOrderItems }
        };
        const wrapper = mountWithStore(<ManageUserOrder />, mockStore);
        expect(mockDispatchFn).nthCalledWith(1, expect.any(Function));
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
        expect(wrapper.text().includes(`Order #${mockOrder.id}`)).toBe(true);
        expect(wrapper.find(".ant-table-row").length).toEqual(2);
    });

    it("should unmount ManageUserOrder", () => {
        const wrapper = mountWithStore(<ManageUserOrder />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: "order/resetOrderState" });
    });
});
