import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { store } from "../../../store";
import { LoadingStatus } from "../../../types/types";
import { API_BASE_URL, USERS_CART } from "../../../constants/urlConstants";
import { fetchCart } from "../cart-thunks";
import { perfumesData } from "../../../utils/test-data/perfume-test-data";

describe("cart slice tests", () => {
    const mock = new MockAdapter(axios);
    let state = store.getState().cart;
    const cart: Map<number, any> = new Map();
    cart.set(34, 1);
    cart.set(35, 1);
    localStorage.setItem("perfumes", JSON.stringify(Array.from(cart.entries())));

    it("should fetchCart dispatches fulfilled on success", async () => {
        expect(state.totalPrice).toEqual(0);
        expect(state.cartItemsCount).toEqual(0);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + USERS_CART).reply(200, perfumesData);
        const result = await store.dispatch(fetchCart([33, 34]));

        state = store.getState().cart;
        expect(result.type).toBe("cart/fetchCart/fulfilled");
        expect(state.totalPrice).toEqual(262);
        expect(state.cartItemsCount).toEqual(3);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });
});
