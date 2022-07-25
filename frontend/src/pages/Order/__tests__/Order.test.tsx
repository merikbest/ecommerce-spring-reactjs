import React from "react";
import { Button, Input } from "antd";

import { createMockRootState, mockDispatch, mountWithStore, waitForComponentToRender } from "../../../utils/test/testHelper";
import { mockCartPerfumesResponse } from "../../../utils/test/__mocks__/perfumes-mock";
import { LoadingStatus } from "../../../types/types";
import OrderItem from "../OrderItem/OrderItem";
import Order from "../Order";

describe("Order", () => {
    const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);
    const mockStore = {
        ...mockRootStore,
        cart: { ...mockRootStore.cart, totalPrice: 777, perfumes: mockCartPerfumesResponse }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        localStorage.setItem("perfumes", "[[17,1],[27,1]]");
        const wrapper = mountWithStore(<Order />, mockStore);
        expect(wrapper.find(OrderItem).length).toEqual(2);
        expect(wrapper.text().includes("To pay : $ 777.00")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, { payload: LoadingStatus.LOADED, type: "order/setOrderLoadingState" });
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });

    it("should insert value and submit form", async () => {
        localStorage.setItem("perfumes", "[[17,1],[27,1]]");
        const wrapper = mountWithStore(<Order />, mockStore);
        wrapper.find(Input).at(3).find("input").at(0).simulate("change", { target: { value: "test_value" } });
        wrapper.find(Input).at(4).find("input").at(0).simulate("change", { target: { value: "test_value" } });
        wrapper.find(Input).at(5).find("input").at(0).simulate("change", { target: { value: "test_value" } });
        wrapper.find(Input).at(6).find("input").at(0).simulate("change", { target: { value: "test_value" } });
        wrapper.find(Button).simulate("submit");
        await waitForComponentToRender(wrapper);
        expect(mockDispatchFn).nthCalledWith(3, expect.any(Function));
    });

    it("should unmount Order", () => {
        const wrapper = mountWithStore(<Order />, mockStore);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(3, { type: "order/resetOrderState" });
        expect(mockDispatchFn).nthCalledWith(4, { type: "cart/resetCartState" });
    });
});
