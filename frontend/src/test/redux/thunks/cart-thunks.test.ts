import thunk, { ThunkDispatch } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { AnyAction } from "redux";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { CartState } from "../../../redux/cart/cart-reducer";
import { API_BASE_URL, USERS_CART } from "../../../constants/urlConstants";
import { fetchCart } from "../../../redux/cart/cart-thunks";
import { perfumesData } from "../../test-data/perfume-test-data";
import { calculateCartPrice, setCartItemsCount, setCartLoadingState } from "../../../redux/cart/cart-actions";
import { setPerfumes } from "../../../redux/perfumes/perfumes-actions";
import { LoadingStatus } from "../../../types/types";

const middlewares = [thunk];
const mockStore = configureMockStore<CartState, ThunkDispatch<CartState, void, AnyAction>>(middlewares);
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
        mock.onPost(API_BASE_URL + USERS_CART).reply(200, perfumesData);
        await store.dispatch(fetchCart([33, 34]));
        let expectedActions = [setCartLoadingState(LoadingStatus.LOADING), setPerfumes(perfumesData), setCartItemsCount(3), calculateCartPrice(perfumesData)];
        expect(store.getActions()).toEqual(expectedActions);
    });
});
