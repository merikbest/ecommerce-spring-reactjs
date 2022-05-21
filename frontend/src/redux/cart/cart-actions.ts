import {
    CALCULATE_CART_PRICE,
    CalculateCartPriceActionType,
    LOADING_CART,
    LoadingCartActionType,
    RESET_CART_STATE,
    ResetCartStateActionType,
    SET_CART_ITEMS_COUNT,
    SetCartItemsCountActionType
} from "./cart-action-types";
import { Perfume } from "../../types/types";

export const loadingCart = (): LoadingCartActionType => ({
    type: LOADING_CART
});

export const calculateCartPrice = (perfumes: Array<Perfume>): CalculateCartPriceActionType => ({
    type: CALCULATE_CART_PRICE,
    payload: perfumes
});

export const setCartItemsCount = (cartItemsCount: number): SetCartItemsCountActionType => ({
    type: SET_CART_ITEMS_COUNT,
    payload: cartItemsCount
});

export const resetCartState = (): ResetCartStateActionType => ({
    type: RESET_CART_STATE
});
