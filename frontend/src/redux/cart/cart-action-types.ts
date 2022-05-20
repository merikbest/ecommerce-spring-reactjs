import {Perfume} from "../../types/types";

export const CALCULATE_CART_PRICE = "cart/CALCULATE_CART_PRICE";
export const LOADING_CART = "cart/LOADING_CART";
export const SET_CART_ITEMS_COUNT = "cart/SET_CART_ITEMS_COUNT";
export const RESET_CART_STATE = "cart/RESET_CART_STATE";

export type LoadingCartActionType = {
    type: typeof LOADING_CART
};

export type CalculateCartPriceActionType = {
    type: typeof CALCULATE_CART_PRICE,
    payload: Array<Perfume>
};

export type SetCartItemsCountActionType = {
    type: typeof SET_CART_ITEMS_COUNT,
    payload: number
};

export type ResetCartStateActionType = {
    type: typeof RESET_CART_STATE
};

export type CartActionTypes =
    | LoadingCartActionType
    | CalculateCartPriceActionType
    | SetCartItemsCountActionType
    | ResetCartStateActionType
