import {createStore} from "redux";

import {ordersData} from "../../test-data/order-test-data";
import ordersReducer, {OrdersState} from "../../../redux/orders/orders-reducer";
import {loadingOrders, resetOrders, setUserOrders} from "../../../redux/orders/orders-actions";
import rootReducer from "../../../redux/root-reducer";

describe("orders reducer", () => {
    const ordersStore = createStore(rootReducer).getState().orders;
    
    test("should set user orders", () => {
        const state: OrdersState = ordersReducer(ordersStore, setUserOrders(ordersData));
        expect(state.orders).toEqual(ordersData);
        expect(state.loading).toBeFalsy();
    });

    test("should reset orders", () => {
        const state: OrdersState = ordersReducer(ordersStore, resetOrders());
        expect(state.orders).toEqual([]);
        expect(state.loading).toEqual(true);
    });

    test("should loading orders", () => {
        const state: OrdersState = ordersReducer(ordersStore, loadingOrders());
        expect(state.orders).toEqual([]);
        expect(state.loading).toEqual(true);
    });
});
