import {
    CALCULATE_CART_PRICE,
    CalculateCartPriceActionType,
    RESET_CART_STATE,
    ResetCartStateActionType,
    SET_CART_ITEMS_COUNT,
    SET_CART_LOADING_STATE,
    SetCartItemsCountActionType,
    SetCartLoadingStateActionType
} from "./cart-action-types";
import { LoadingStatus, Perfume } from "../../types/types";

export const setCartLoadingState = (status: LoadingStatus): SetCartLoadingStateActionType => ({
    type: SET_CART_LOADING_STATE,
    payload: status
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
