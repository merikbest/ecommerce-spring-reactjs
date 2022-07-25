import React from "react";

import { createMockRootState, mountWithStore } from "../../../utils/test/testHelper";
import { LoadingStatus } from "../../../types/types";
import CartTotalPrice from "../CartTotalPrice";

describe("CartTotalPrice", () => {
    it("should render loading spinner", () => {
        const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);
        const mockStore = { ...mockRootStore, cart: { ...mockRootStore.cart, totalPrice: 777 } };
        const wrapper = mountWithStore(<CartTotalPrice />, mockStore);
        expect(wrapper.text().includes("Total: $ 777")).toBe(true);
    });
});
