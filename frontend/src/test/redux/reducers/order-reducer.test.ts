import {createStore} from "redux";
import rootReducer from "../../../redux/reducers/root-reducer";
import orderReducer, {InitialStateType} from "../../../redux/reducers/order-reducer";
import {showLoader} from "../../../redux/actions/auth-actions";
import {fetchOrderSuccess, fetchUserOrdersByQuerySuccess, fetchUserOrdersSuccess, orderAddedFailure, orderAddedSuccess} from "../../../redux/actions/order-actions";
import {Order, OrderError} from "../../../types/types";
import {orderData, orderErrorData, ordersData} from "../../test-data/order-test-data";

let store = createStore(rootReducer);
let orderError: OrderError;
let order: Order;
let orders: Array<Order>;

beforeEach(() => {
    order = orderData;
    orders = ordersData;
    orderError = orderErrorData;
});

test("Show Loader", () => {
    const state: InitialStateType = orderReducer(store.getState().order, showLoader());
    expect(state.loading).toBeTruthy();
});

test("Fetch Order", () => {
    const state: InitialStateType = orderReducer(store.getState().order, fetchOrderSuccess());
    expect(state.loading).toBeFalsy();
    expect(state.errors).toEqual({});
});

test("Added Order Success", () => {
    const state: InitialStateType = orderReducer(store.getState().order, orderAddedSuccess(order));
    expect(state.order).toEqual(order);
    expect(state.loading).toBeFalsy();
});

test("Added Order Failure", () => {
    const state: InitialStateType = orderReducer(store.getState().order, orderAddedFailure(orderError));
    expect(state.errors).toEqual(orderError);
    expect(state.order).toEqual({});
    expect(state.loading).toBeFalsy();
});

test("Fetch User Orders", () => {
    const state: InitialStateType = orderReducer(store.getState().order, fetchUserOrdersSuccess(orders));
    expect(state.orders).toEqual(orders);
    expect(state.loading).toBeFalsy();
});

test("Fetch User Orders By Query Success", () => {
    const state: InitialStateType = orderReducer(store.getState().order, fetchUserOrdersByQuerySuccess(orders));
    expect(state.orders).toEqual(orders);
    expect(state.loading).toBeFalsy();
});
