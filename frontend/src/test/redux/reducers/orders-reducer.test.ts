import { createStore } from "redux";

import { ordersData } from "../../test-data/order-test-data";
import ordersReducer, { OrdersState } from "../../../redux/orders/orders-reducer";
import { resetOrders, setOrdersLoadingState, setUserOrders } from "../../../redux/orders/orders-actions";
import rootReducer from "../../../redux/root-reducer";
import { LoadingStatus } from "../../../types/types";

describe("orders reducer", () => {
    const ordersStore = createStore(rootReducer).getState().orders;

    test("should set user orders", () => {
        const state: OrdersState = ordersReducer(ordersStore, setUserOrders(ordersData));
        expect(state.orders).toEqual(ordersData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    test("should reset orders", () => {
        const state: OrdersState = ordersReducer(ordersStore, resetOrders());
        expect(state.orders).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
    });

    test("should loading orders", () => {
        const state: OrdersState = ordersReducer(ordersStore, setOrdersLoadingState(LoadingStatus.LOADING));
        expect(state.orders).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
    });
});
