import { createStore } from "redux";

import rootReducer from "../../../redux/root-reducer";
import cartReducer, { CartState } from "../../../redux/cart/cart-reducer";
import {
    calculateCartPrice,
    resetCartState,
    setCartItemsCount,
    setCartLoadingState
} from "../../../redux/cart/cart-actions";
import { perfumesData } from "../../test-data/perfume-test-data";
import { LoadingStatus } from "../../../types/types";

describe("cart reducer", () => {
    const cartStore = createStore(rootReducer).getState().cart;

    test("should Loading Cart", () => {
        const state: CartState = cartReducer(cartStore, setCartLoadingState(LoadingStatus.LOADING));
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
    });

    test("should Set Cart Items Count", () => {
        const state: CartState = cartReducer(cartStore, setCartItemsCount(123));
        expect(state.cartItemsCount).toEqual(123);
    });

    test("should Calculate Cart Price", () => {
        const state: CartState = cartReducer(cartStore, calculateCartPrice(perfumesData));
        expect(state.totalPrice).toEqual(0);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    test("should reset cart state", () => {
        const state: CartState = cartReducer(cartStore, resetCartState());
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
    });
});
