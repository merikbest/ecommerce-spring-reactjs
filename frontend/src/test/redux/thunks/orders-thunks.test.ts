import { AnyAction } from "redux";
import axios from "axios";
import thunk, { ThunkDispatch } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";

import {
    ADMIN_GRAPHQL_ORDER,
    ADMIN_ORDER,
    ADMIN_ORDERS,
    API_BASE_URL,
    USERS_GRAPHQL_ORDERS,
    USERS_ORDERS
} from "../../../constants/urlConstants";
import { ordersData } from "../../test-data/order-test-data";
import {
    fetchAllUsersOrders,
    fetchUserOrders,
    fetchUserOrdersByEmail,
    fetchUserOrdersByEmailQuery,
    fetchUserOrdersByQuery
} from "../../../redux/orders/orders-thunks";
import { setOrdersLoadingState, setUserOrders } from "../../../redux/orders/orders-actions";
import { OrdersState } from "../../../redux/orders/orders-reducer";
import { LoadingStatus } from "../../../types/types";

const middlewares = [thunk];
const mockStore = configureMockStore<OrdersState, ThunkDispatch<OrdersState, void, AnyAction>>(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

describe("orders actions", () => {
    const mockEmail = "test123@test.com";

    beforeEach(() => {
        store.clearActions();
    });

    test("fetchUserOrders should dispatches LOADING_ORDERS and SET_USER_ORDERS on success", async () => {
        mock.onGet(API_BASE_URL + USERS_ORDERS).reply(200, ordersData);
        let expectedActions = [setOrdersLoadingState(LoadingStatus.LOADING), setUserOrders(ordersData)];
        await store.dispatch(fetchUserOrders());
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchAllUsersOrders should dispatches LOADING_ORDERS and SET_USER_ORDERS on success", async () => {
        mock.onGet(API_BASE_URL + ADMIN_ORDERS).reply(200, ordersData);
        await store.dispatch(fetchAllUsersOrders());
        let expectedActions = [setOrdersLoadingState(LoadingStatus.LOADING), setUserOrders(ordersData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchUserOrdersByEmail should dispatches LOADING_ORDERS and SET_USER_ORDERS on success", async () => {
        mock.onPost(API_BASE_URL + ADMIN_ORDER).reply(200, ordersData);
        await store.dispatch(fetchUserOrdersByEmail(mockEmail));
        let expectedActions = [setOrdersLoadingState(LoadingStatus.LOADING), setUserOrders(ordersData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchUserOrdersByQuery should LOADING_ORDERS and SET_USER_ORDERS on success", async () => {
        mock.onPost(API_BASE_URL + USERS_GRAPHQL_ORDERS).reply(200, { data: { ordersByEmail: ordersData } });
        let expectedActions = [setOrdersLoadingState(LoadingStatus.LOADING), setUserOrders(ordersData)];
        await store.dispatch(fetchUserOrdersByQuery(mockEmail));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchUserOrdersByEmailQuery should dispatches LOADING_DATA and SET_USER_ORDERS on success", async () => {
        mock.onPost(API_BASE_URL + ADMIN_GRAPHQL_ORDER).reply(200, { data: { ordersByEmail: ordersData } });
        await store.dispatch(fetchUserOrdersByEmailQuery(mockEmail));
        let expectedActions = [setOrdersLoadingState(LoadingStatus.LOADING), setUserOrders(ordersData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchUserOrdersByEmailQuery should dispatches LOADING_ORDERS and SET_USER_ORDERS on success", async () => {
        mock.onPost(API_BASE_URL + ADMIN_GRAPHQL_ORDER).reply(200, { data: { ordersByEmail: ordersData } });
        await store.dispatch(fetchUserOrdersByEmailQuery(mockEmail));
        let expectedActions = [setOrdersLoadingState(LoadingStatus.LOADING), setUserOrders(ordersData)];
        expect(store.getActions()).toEqual(expectedActions);
    });
});
