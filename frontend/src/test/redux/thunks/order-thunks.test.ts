import thunk, { ThunkDispatch } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { useHistory } from "react-router-dom";
import { AnyAction } from "redux";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { API_BASE_URL, USERS_ORDER } from "../../../constants/urlConstants";
import { orderData, orderErrorData, orderRequestData } from "../../test-data/order-test-data";
import { addOrder } from "../../../redux/order/order-thunks";
import { loadingOrder, orderAddedFailure, setOrder } from "../../../redux/order/order-actions";
import { OrderState } from "../../../redux/order/order-reducer";

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

    test("addOrder should dispatches SHOW_LOADER and ORDER_ADDED_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + USERS_ORDER).reply(200, orderData);
        let expectedActions = [loadingOrder(), setOrder(orderData)];
        await store.dispatch(addOrder(orderRequestData, useHistory()));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("addOrder should dispatches SHOW_LOADER and ORDER_ADDED_FAILURE on failure", async () => {
        mock.onPost(API_BASE_URL + USERS_ORDER).reply(400, orderErrorData);
        let expectedActions = [loadingOrder(), orderAddedFailure(orderErrorData)];
        await store.dispatch(addOrder(orderRequestData, useHistory()));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
