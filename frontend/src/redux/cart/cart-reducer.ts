import {
    CALCULATE_CART_PRICE,
    CartActionTypes,
    RESET_CART_STATE,
    SET_CART_ITEMS_COUNT,
    SET_CART_LOADING_STATE
} from "./cart-action-types";
import { LoadingStatus, Perfume } from "../../types/types";

export type CartState = {
    loadingState: LoadingStatus;
    totalPrice: number;
    cartItemsCount: number;
};

const initialState: CartState = {
    loadingState: LoadingStatus.LOADING,
    totalPrice: 0,
    cartItemsCount: 0
};

const cartReducer = (state: CartState = initialState, action: CartActionTypes): CartState => {
    switch (action.type) {
        case SET_CART_LOADING_STATE:
            return { ...state, loadingState: action.payload };

        case CALCULATE_CART_PRICE:
            return { ...state, totalPrice: calculateCartPrice(action.payload), loadingState: LoadingStatus.LOADED };

        case SET_CART_ITEMS_COUNT:
            return { ...state, cartItemsCount: action.payload };

        case RESET_CART_STATE:
            return { ...state, loadingState: LoadingStatus.LOADING };

        default:
            return state;
    }
};

export default cartReducer;

const calculateCartPrice = (perfumes: Array<Perfume>): number => {
    const perfumesFromLocalStorage: Map<number, number> = new Map(JSON.parse(<string>localStorage.getItem("perfumes")));
    let total = 0;

    perfumesFromLocalStorage.forEach((value, key) => {
        const perfume = perfumes.find((perfume) => perfume.id === key);

        if (perfume) {
            total += perfume.price * value;
        }
    });
    return total;
};
