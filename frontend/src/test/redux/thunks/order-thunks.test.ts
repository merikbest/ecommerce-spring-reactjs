import thunk, { ThunkDispatch } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { useHistory } from "react-router-dom";
import { AnyAction } from "redux";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { API_BASE_URL, USERS_ORDER } from "../../../constants/urlConstants";
import { orderData, orderErrorData, orderRequestData } from "../../test-data/order-test-data";
import { addOrder, fetchOrderById, fetchOrderItemsByOrderId } from "../../../redux/order/order-thunks";
import {
    orderAddedFailure,
    setOrder,
    setOrderError,
    setOrderItems,
    setOrderLoadingState
} from "../../../redux/order/order-actions";
import { OrderState } from "../../../redux/order/order-reducer";
import { LoadingStatus } from "../../../types/types";

const middlewares = [thunk];
const mockStore = configureMockStore<OrderState, ThunkDispatch<OrderState, void, AnyAction>>(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        push: jest.fn()
    })
}));

describe("order actions", () => {
    beforeEach(() => {
        store.clearActions();
    });

    test("fetchOrderById should dispatches SET_ORDER_LOADING_STATE and SET_ORDER on success", async () => {
        mock.onGet(API_BASE_URL + `${USERS_ORDER}/1`).reply(200, orderData);
        let expectedActions = [setOrderLoadingState(LoadingStatus.LOADING), setOrder(orderData)];
        await store.dispatch(fetchOrderById("1"));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchOrderById should dispatches SET_ORDER_LOADING_STATE and SET_ORDER_ERROR on failure", async () => {
        mock.onGet(API_BASE_URL + `${USERS_ORDER}/1`).reply(400, "ERROR");
        let expectedActions = [setOrderLoadingState(LoadingStatus.LOADING), setOrderError("ERROR")];
        await store.dispatch(fetchOrderById("1"));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchOrderItemsByOrderId should SET_ORDER_ITEMS on success", async () => {
        mock.onGet(API_BASE_URL + `${USERS_ORDER}/1/items`).reply(200, orderData.orderItems);
        let expectedActions = [setOrderItems(orderData.orderItems)];
        await store.dispatch(fetchOrderItemsByOrderId("1"));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("addOrder should dispatches SET_ORDER_LOADING_STATE and ORDER_ADDED_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + USERS_ORDER).reply(200, orderData);
        let expectedActions = [setOrderLoadingState(LoadingStatus.LOADING), setOrder(orderData)];
        await store.dispatch(addOrder(orderRequestData, useHistory()));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("addOrder should dispatches SET_ORDER_LOADING_STATE and ORDER_ADDED_FAILURE on failure", async () => {
        mock.onPost(API_BASE_URL + USERS_ORDER).reply(400, orderErrorData);
        let expectedActions = [setOrderLoadingState(LoadingStatus.LOADING), orderAddedFailure(orderErrorData)];
        await store.dispatch(addOrder(orderRequestData, useHistory()));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
