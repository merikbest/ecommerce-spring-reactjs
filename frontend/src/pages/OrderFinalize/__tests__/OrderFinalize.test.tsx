import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../utils/test/testHelper";
import { LoadingStatus } from "../../../types/types";
import { mockOrder } from "../../../utils/test/__mocks__/orders-mock";
import OrderFinalize from "../OrderFinalize";

describe("OrderFinalize", () => {
    const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);
    const mockStore = {
        ...mockRootStore,
        order: { ...mockRootStore.order, order: mockOrder }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<OrderFinalize />, mockStore);
        expect(mockDispatchFn).nthCalledWith(1, { type: "cart/resetCartState" });
        expect(wrapper.text().includes("Thank you for the order!")).toBe(true);
        expect(wrapper.text().includes("Your order number is: 1")).toBe(true);
    });
});
