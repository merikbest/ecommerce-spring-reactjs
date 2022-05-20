import {AnyAction} from "redux";
import axios from "axios";
import thunk, {ThunkDispatch} from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";

import {API_BASE_URL} from "../../../utils/constants/url";
import {ordersData} from "../../test-data/order-test-data";
import {
    fetchAllUsersOrders,
    fetchUserOrders,
    fetchUserOrdersByEmailQuery,
    fetchUserOrdersByQuery
} from "../../../redux/orders/orders-thunks";
import {
    setUserOrdersByQuery,
    setUserOrders,
    loadingOrders
} from "../../../redux/orders/orders-actions";
import {OrdersState} from "../../../redux/orders/orders-reducer";

const middlewares = [thunk];
const mockStore = configureMockStore<OrdersState, ThunkDispatch<OrdersState, void, AnyAction>>(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

describe("orders actions", () => {
    
    beforeEach(() => {
        store.clearActions();
    });
    
    test("fetchAllUsersOrders should dispatches LOADING_ORDERS and FETCH_USER_ORDERS_SUCCESS on success", async () => {
        mock.onGet(API_BASE_URL + "/admin/orders").reply(200, ordersData);
        await store.dispatch(fetchAllUsersOrders());
        let expectedActions = [loadingOrders(), setUserOrders(ordersData)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchUserOrders should dispatches LOADING_ORDERS and FETCH_USER_ORDERS_SUCCESS on success", async () => {
        mock.onGet(API_BASE_URL + "/users/orders").reply(200, ordersData);
        let expectedActions = [loadingOrders(), setUserOrders(ordersData)];
        await store.dispatch(fetchUserOrders());
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchUserOrdersByQuery should LOADING_ORDERS and dispatches FETCH_USER_ORDERS_BY_QUERY_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/users/graphql/orders").reply(200, {data: {ordersByEmail: ordersData}});
        let expectedActions = [loadingOrders(), setUserOrdersByQuery(ordersData)];
        await store.dispatch(fetchUserOrdersByQuery("test123@test.com"));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("fetchUserOrdersByEmailQuery should dispatches LOADING_ORDERS and FETCH_USER_ORDERS_BY_QUERY_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/admin/graphql/order").reply(200, {data: {ordersByEmail: ordersData}});
        await store.dispatch(fetchUserOrdersByEmailQuery("test123@test.com"));
        let expectedActions = [loadingOrders(), setUserOrdersByQuery(ordersData)];
        expect(store.getActions()).toEqual(expectedActions);
    });
});
