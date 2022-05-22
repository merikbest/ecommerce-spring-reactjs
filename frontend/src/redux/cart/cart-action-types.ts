import { LoadingStatus, Perfume } from "../../types/types";

export const SET_CART_LOADING_STATE = "cart/SET_CART_LOADING_STATE";
export const CALCULATE_CART_PRICE = "cart/CALCULATE_CART_PRICE";
export const SET_CART_ITEMS_COUNT = "cart/SET_CART_ITEMS_COUNT";
export const RESET_CART_STATE = "cart/RESET_CART_STATE";

export type SetCartLoadingStateActionType = {
    type: typeof SET_CART_LOADING_STATE;
    payload: LoadingStatus;
};

export type CalculateCartPriceActionType = {
    type: typeof CALCULATE_CART_PRICE;
    payload: Array<Perfume>;
};

export type SetCartItemsCountActionType = {
    type: typeof SET_CART_ITEMS_COUNT;
    payload: number;
};

export type ResetCartStateActionType = {
    type: typeof RESET_CART_STATE;
};

export type CartActionTypes =
    | SetCartLoadingStateActionType
    | CalculateCartPriceActionType
    | SetCartItemsCountActionType
    | ResetCartStateActionType;
