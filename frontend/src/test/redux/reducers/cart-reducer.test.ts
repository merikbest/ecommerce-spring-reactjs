import {createStore} from "redux";
import rootReducer from "../../../redux/reducers/root-reducer";
import cartReducer, {InitialStateType} from "../../../redux/reducers/cart-reducer";
import {
    calculateCartPriceSuccess,
    clearCartSuccess,
    fetchCartSuccess,
    loadingCart,
    stopLoadingCart
} from "../../../redux/actions/cart-actions";
import {Perfume} from "../../../types/types";
import {perfumesData} from "../../test-data/perfume-test-data";

let store = createStore(rootReducer);
let perfumes: Array<Perfume>;
let cartPrice: number;

beforeEach(() => {
    perfumes = perfumesData;
    cartPrice = 123;
});

test("Loading Cart", () => {
    const state: InitialStateType = cartReducer(store.getState().cart, loadingCart());
    expect(state.loading).toBeTruthy();
});

test("Stop Loading Cart", () => {
    const state: InitialStateType = cartReducer(store.getState().cart, stopLoadingCart());
    expect(state.loading).toBeFalsy();
    expect(state.perfumes).toEqual([]);
});

test("Clear Cart", () => {
    const state: InitialStateType = cartReducer(store.getState().cart, clearCartSuccess());
    expect(state.perfumes).toEqual([]);
});

test("Fetch Cart", () => {
    const state: InitialStateType = cartReducer(store.getState().cart, fetchCartSuccess(perfumes));
    expect(state.perfumes).toEqual(perfumes);
    expect(state.loading).toBeFalsy();
});

test("Calculate Cart Price", () => {
    const state: InitialStateType = cartReducer(store.getState().cart, calculateCartPriceSuccess(cartPrice));
    expect(state.totalPrice).toEqual(cartPrice);
    expect(state.loading).toBeFalsy();
});
