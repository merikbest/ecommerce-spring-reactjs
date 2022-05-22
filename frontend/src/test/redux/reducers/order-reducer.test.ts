import { createStore } from "redux";

import rootReducer from "../../../redux/root-reducer";
import orderReducer, { OrderState } from "../../../redux/order/order-reducer";
import { orderAddedFailure, resetOrderState, setOrder, setOrderLoadingState } from "../../../redux/order/order-actions";
import { orderData, orderErrorData } from "../../test-data/order-test-data";
import { LoadingStatus } from "../../../types/types";

describe("order reducer", () => {
    const orderStore = createStore(rootReducer).getState().order;

    test("should Show Loader", () => {
        const state: OrderState = orderReducer(orderStore, setOrderLoadingState(LoadingStatus.LOADING));
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
    });

    test("should Added Order Success", () => {
        const state: OrderState = orderReducer(orderStore, setOrder(orderData));
        expect(state.order).toEqual(orderData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    test("should Added Order Failure", () => {
        const state: OrderState = orderReducer(orderStore, orderAddedFailure(orderErrorData));
        expect(state.errors).toEqual(orderErrorData);
        expect(state.order).toEqual({});
        expect(state.loadingState).toEqual(LoadingStatus.ERROR);
    });

    test("should Reset Order State", () => {
        const state: OrderState = orderReducer(orderStore, resetOrderState());
        expect(state.errors).toEqual({});
        expect(state.order).toEqual({});
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
    });
});
