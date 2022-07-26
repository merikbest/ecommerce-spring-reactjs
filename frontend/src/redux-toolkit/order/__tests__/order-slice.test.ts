import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { createMemoryHistory } from "history";

import { API_BASE_URL, USERS_ORDER } from "../../../constants/urlConstants";
import {mockOrder, mockOrderErrors, mockOrderItems, mockOrderRequest} from "../../../utils/test/__mocks__/orders-mock";
import { store } from "../../../store";
import { LoadingStatus } from "../../../types/types";
import { addOrder, fetchOrderById, fetchOrderItemsByOrderId } from "../order-thunks";
import { ORDER_FINALIZE } from "../../../constants/routeConstants";
import { initialState } from "../order-slice";

describe("order slice tests", () => {
    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, "push");
    const mock = new MockAdapter(axios);
    let state = store.getState().order;

    beforeEach(() => {
        state = initialState;
    });

    it("should fetchOrderById dispatches fulfilled on success", async () => {
        expect(state.order).toEqual({});
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${USERS_ORDER}/1`).reply(200, mockOrder);
        const result = await store.dispatch(fetchOrderById("1"));

        state = store.getState().order;
        expect(result.type).toBe("order/fetchOrderById/fulfilled");
        expect(state.order).toEqual(mockOrder);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchOrderItemsByOrderId dispatches rejected on failure", async () => {
        expect(state.errorMessage).toEqual("");
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${USERS_ORDER}/1`).reply(400, "ERROR");
        const result = await store.dispatch(fetchOrderById("1"));

        state = store.getState().order;
        expect(result.type).toBe("order/fetchOrderById/rejected");
        expect(state.errorMessage).toEqual("ERROR");
        expect(state.loadingState).toEqual(LoadingStatus.ERROR);
    });

    it("should fetchOrderItemsByOrderId dispatches fulfilled on success", async () => {
        expect(state.orderItems).toEqual([]);

        mock.onGet(API_BASE_URL + `${USERS_ORDER}/1/items`).reply(200, mockOrderItems);
        const result = await store.dispatch(fetchOrderItemsByOrderId("1"));

        state = store.getState().order;
        expect(result.type).toBe("order/fetchOrderItemsByOrderId/fulfilled");
        expect(state.orderItems).toEqual(mockOrderItems);
    });

    it("should addOrder dispatches fulfilled on success", async () => {
        expect(state.order).toEqual({});
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + USERS_ORDER).reply(200, mockOrder);
        const result = await store.dispatch(addOrder({ order: mockOrderRequest, history: history }));

        state = store.getState().order;
        expect(result.type).toBe("order/addOrder/fulfilled");
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(ORDER_FINALIZE);
        expect(state.order).toEqual(mockOrder);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should addOrder dispatches rejected on failure", async () => {
        expect(state.errors).toEqual({});
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + USERS_ORDER).reply(400, mockOrderErrors);
        const result = await store.dispatch(addOrder({ order: mockOrderRequest, history: history }));

        state = store.getState().order;
        expect(result.type).toBe("order/addOrder/rejected");
        expect(state.errors).toEqual(mockOrderErrors);
        expect(state.loadingState).toEqual(LoadingStatus.ERROR);
    });
});
