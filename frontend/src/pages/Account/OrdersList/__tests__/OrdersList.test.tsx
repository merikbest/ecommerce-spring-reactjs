import React from "react";

import { mockDispatch, mountWithStore } from "../../../../utils/test/testHelper";
import OrdersList from "../OrdersList";

describe("OrdersList", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading spinner", () => {
        mountWithStore(<OrdersList />);
        expect(mockDispatchFn).nthCalledWith(1, expect.any(Function));
    });

    it("should unmount OrdersList", () => {
        const wrapper = mountWithStore(<OrdersList />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: "orders/resetOrders" });
    });
});
