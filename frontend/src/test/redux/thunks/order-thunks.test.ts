import thunk, {ThunkDispatch} from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {AnyAction} from "redux";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {InitialStateType} from "../../../redux/reducers/order-reducer";
import {API_BASE_URL} from "../../../utils/constants/url";
import {orderData, orderErrorData, orderRequestData, ordersData} from "../../test-data/order-test-data";
import {addOrder, fetchUserOrders} from "../../../redux/thunks/order-thunks";
import {useHistory} from "react-router-dom";
import {showLoader} from "../../../redux/actions/auth-actions";
import {fetchUserOrdersSuccess, orderAddedFailure, orderAddedSuccess} from "../../../redux/actions/order-actions";

const middlewares = [thunk];
const mockStore = configureMockStore<InitialStateType, ThunkDispatch<InitialStateType, void, AnyAction>>(middlewares);
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
        mock.onPost(API_BASE_URL + "/users/order").reply(200, orderData);
        let expectedActions = [showLoader(), orderAddedSuccess(orderData)];
        await store.dispatch(addOrder(orderRequestData, useHistory()));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("addOrder should dispatches SHOW_LOADER and ORDER_ADDED_FAILURE on failure", async () => {
        mock.onPost(API_BASE_URL + "/users/order").reply(400, orderErrorData);
        let expectedActions = [showLoader(), orderAddedFailure(orderErrorData)];
        await store.dispatch(addOrder(orderRequestData, useHistory()));
        expect(store.getActions()).toEqual(expectedActions);

    });

    test("fetchUserOrders should dispatches FETCH_USER_ORDERS_SUCCESS on success", async () => {
        mock.onGet(API_BASE_URL + "/users/orders").reply(200, ordersData);
        let expectedActions = [fetchUserOrdersSuccess(ordersData)];
        await store.dispatch(fetchUserOrders());
        expect(store.getActions()).toEqual(expectedActions);
    });
});
