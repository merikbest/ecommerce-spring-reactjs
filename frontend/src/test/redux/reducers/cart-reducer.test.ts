import {createStore} from "redux";

import rootReducer from "../../../redux/root-reducer";
import cartReducer, {CartState} from "../../../redux/cart/cart-reducer";
import {calculateCartPrice, loadingCart, resetCartState, setCartItemsCount} from "../../../redux/cart/cart-actions";
import {perfumesData} from "../../test-data/perfume-test-data";

describe("cart reducer", () => {
    const cartStore = createStore(rootReducer).getState().cart;
    
    test("should Loading Cart", () => {
        const state: CartState = cartReducer(cartStore, loadingCart());
        expect(state.loading).toBeTruthy();
    });

    test("should Set Cart Items Count", () => {
        const state: CartState = cartReducer(cartStore, setCartItemsCount(123));
        expect(state.cartItemsCount).toEqual(123);
    });

    test("should Calculate Cart Price", () => {
        const state: CartState = cartReducer(cartStore, calculateCartPrice(perfumesData));
        expect(state.totalPrice).toEqual(0);
        expect(state.loading).toBeFalsy();
    });

    test("should reset cart state", () => {
        const state: CartState = cartReducer(cartStore, resetCartState());
        expect(state.loading).toBeTruthy();
    });
});
