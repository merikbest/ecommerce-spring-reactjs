import React from "react";

import { mockDispatch, mountWithStore } from "../../../utils/test/testHelper";
import { mockOrders } from "../../../utils/test/__mocks__/orders-mock";
import OrdersTable from "../OrdersTable";

describe("OrdersTable", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <OrdersTable orders={mockOrders} loading={false} fetchOrders={expect.any(Function)} />
        );
        expect(wrapper.find(".ant-table-row").length).toEqual(5);
    });
});
