import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { store } from "../../../store";
import { initialState } from "../orders-slice";
import { LoadingStatus } from "../../../types/types";
import {
    ADMIN_GRAPHQL_ORDER,
    ADMIN_GRAPHQL_ORDERS,
    ADMIN_ORDER,
    ADMIN_ORDERS,
    API_BASE_URL,
    USERS_GRAPHQL_ORDERS,
    USERS_ORDERS
} from "../../../constants/urlConstants";
import { ordersData } from "../../../utils/test-data/order-test-data";
import {
    fetchAllUsersOrders,
    fetchAllUsersOrdersByQuery,
    fetchUserOrders,
    fetchUserOrdersByEmail,
    fetchUserOrdersByEmailQuery,
    fetchUserOrdersByQuery
} from "../orders-thunks";

describe("orders slice tests", () => {
    const mock = new MockAdapter(axios);
    let state = store.getState().orders;
    const mockEmail = "test123@test.com";

    beforeEach(() => {
        state = initialState;
    });

    it("should fetchUserOrders dispatches fulfilled on success", async () => {
        expect(state.orders).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + USERS_ORDERS).reply(200, ordersData);
        const result = await store.dispatch(fetchUserOrders());

        state = store.getState().orders;
        expect(result.type).toBe("orders/fetchUserOrders/fulfilled");
        expect(state.orders).toEqual(ordersData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchAllUsersOrders dispatches fulfilled on success", async () => {
        expect(state.orders).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + ADMIN_ORDERS).reply(200, ordersData);
        const result = await store.dispatch(fetchAllUsersOrders());

        state = store.getState().orders;
        expect(result.type).toBe("orders/fetchAllUsersOrders/fulfilled");
        expect(state.orders).toEqual(ordersData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchUserOrdersByEmail dispatches fulfilled on success", async () => {
        expect(state.orders).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${ADMIN_ORDER}/${mockEmail}`).reply(200, ordersData);
        const result = await store.dispatch(fetchUserOrdersByEmail(mockEmail));

        state = store.getState().orders;
        expect(result.type).toBe("orders/fetchUserOrdersByEmail/fulfilled");
        expect(state.orders).toEqual(ordersData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchUserOrdersByQuery dispatches fulfilled on success", async () => {
        expect(state.orders).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + USERS_GRAPHQL_ORDERS).reply(200, { data: { ordersByEmail: ordersData } });
        const result = await store.dispatch(fetchUserOrdersByQuery(mockEmail));

        state = store.getState().orders;
        expect(result.type).toBe("orders/fetchUserOrdersByQuery/fulfilled");
        expect(state.orders).toEqual(ordersData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchAllUsersOrdersByQuery dispatches fulfilled on success", async () => {
        expect(state.orders).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + ADMIN_GRAPHQL_ORDERS).reply(200, { data: { orders: ordersData } });
        const result = await store.dispatch(fetchAllUsersOrdersByQuery());

        state = store.getState().orders;
        expect(result.type).toBe("orders/fetchAllUsersOrdersByQuery/fulfilled");
        expect(state.orders).toEqual(ordersData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchUserOrdersByEmailQuery dispatches fulfilled on success", async () => {
        expect(state.orders).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + ADMIN_GRAPHQL_ORDER).reply(200, { data: { ordersByEmail: ordersData } });
        const result = await store.dispatch(fetchUserOrdersByEmailQuery(mockEmail));

        state = store.getState().orders;
        expect(result.type).toBe("orders/fetchUserOrdersByEmailQuery/fulfilled");
        expect(state.orders).toEqual(ordersData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });
});
