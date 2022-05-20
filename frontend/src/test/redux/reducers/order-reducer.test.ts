import {createStore} from "redux";

import rootReducer from "../../../redux/root-reducer";
import orderReducer, {OrderState} from "../../../redux/order/order-reducer";
import {loadingOrder, orderAddedFailure, resetOrderState, setOrder} from "../../../redux/order/order-actions";
import {orderData, orderErrorData} from "../../test-data/order-test-data";

describe("order reducer", () => {
    const orderStore = createStore(rootReducer).getState().order;
    
    test("should Show Loader", () => {
        const state: OrderState = orderReducer(orderStore, loadingOrder());
        expect(state.loading).toBeTruthy();
    });

    test("should Added Order Success", () => {
        const state: OrderState = orderReducer(orderStore, setOrder(orderData));
        expect(state.order).toEqual(orderData);
        expect(state.loading).toBeFalsy();
    });

    test("should Added Order Failure", () => {
        const state: OrderState = orderReducer(orderStore, orderAddedFailure(orderErrorData));
        expect(state.errors).toEqual(orderErrorData);
        expect(state.order).toEqual({});
        expect(state.loading).toBeFalsy();
    });

    test("should Reset Order State", () => {
        const state: OrderState = orderReducer(orderStore, resetOrderState());
        expect(state.errors).toEqual({});
        expect(state.order).toEqual({});
        expect(state.loading).toBeFalsy();
    });
});
