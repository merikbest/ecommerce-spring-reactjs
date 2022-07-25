import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { store } from "../../../store";
import { LoadingStatus } from "../../../types/types";
import { API_BASE_URL, USERS_CART } from "../../../constants/urlConstants";
import { fetchCart } from "../cart-thunks";
import { mockCartPerfumesResponse } from "../../../utils/test/__mocks__/perfumes-mock";

describe("cart slice tests", () => {
    const mock = new MockAdapter(axios);
    let state = store.getState().cart;
    const cart: Map<number, any> = new Map();
    cart.set(17, 1);
    cart.set(27, 1);
    localStorage.setItem("perfumes", JSON.stringify(Array.from(cart.entries())));

    it("should fetchCart dispatches fulfilled on success", async () => {
        expect(state.totalPrice).toEqual(0);
        expect(state.cartItemsCount).toEqual(0);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + USERS_CART).reply(200, mockCartPerfumesResponse);
        const result = await store.dispatch(fetchCart([17, 27]));

        state = store.getState().cart;
        expect(result.type).toBe("cart/fetchCart/fulfilled");
        expect(state.totalPrice).toEqual(327);
        expect(state.cartItemsCount).toEqual(2);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });
});
