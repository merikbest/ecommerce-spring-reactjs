import thunk, {ThunkDispatch} from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {AnyAction} from "redux";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {InitialStateType} from "../../../redux/reducers/cart-reducer";
import {API_BASE_URL} from "../../../utils/constants/url";
import {calculateCartPrice, fetchCart} from "../../../redux/thunks/cart-thunks";
import {perfumesData} from "../../test-data/perfume-test-data";
import {calculateCartPriceSuccess, fetchCartSuccess, loadingCart} from "../../../redux/actions/cart-actions";

const middlewares = [thunk];
const mockStore = configureMockStore<InitialStateType, ThunkDispatch<InitialStateType, void, AnyAction>>(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

describe("cart actions", () => {

    beforeEach(() => {
        store.clearActions();

        let cart: Map<number, any> = new Map();
        cart.set(34, 1);
        cart.set(35, 1);
        localStorage.setItem("perfumes", JSON.stringify(Array.from(cart.entries())));
    });

    test("fetchCart should dispatches LOADING_CART, FETCH_CART_SUCCESS, CALCULATE_CART_PRICE_SUCCESS on success", async () => {
        mock.onPost(API_BASE_URL + "/users/cart").reply(200, perfumesData);
        await store.dispatch(fetchCart([33, 34]));
        let expectedActions = [loadingCart(), fetchCartSuccess(perfumesData), calculateCartPriceSuccess(262)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    test("calculateCartPrice should dispatches CALCULATE_CART_PRICE_SUCCESS on success", () => {
        store.dispatch(calculateCartPrice(perfumesData));
        let expectedActions = [calculateCartPriceSuccess(262)];
        expect(store.getActions()).toEqual(expectedActions);
    });
});
