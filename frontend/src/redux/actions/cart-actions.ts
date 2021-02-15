import {Perfume} from "../../types/types";
import {
    CALCULATE_CART_PRICE_SUCCESS,
    CLEAR_CART_SUCCESS,
    FETCH_CART_SUCCESS,
    LOADING_CART,
    STOP_LOADING_CART,
    CalculateCartPriceSuccessActionType,
    ClearCartActionType,
    FetchCartSuccessActionType,
    LoadingCartActionType,
    StopLoadingCartActionType
} from "../action-types/cart-action-types";

export const loadingCart = (): LoadingCartActionType => ({
    type: LOADING_CART
});

export const fetchCartSuccess = (perfumes: Array<Perfume>): FetchCartSuccessActionType => ({
    type: FETCH_CART_SUCCESS,
    payload: perfumes
});

export const calculateCartPriceSuccess = (total: number): CalculateCartPriceSuccessActionType => ({
    type: CALCULATE_CART_PRICE_SUCCESS,
    payload: total
});

export const clearCartSuccess = (): ClearCartActionType => ({
    type: CLEAR_CART_SUCCESS
});

export const stopLoadingCart = (): StopLoadingCartActionType => ({
    type: STOP_LOADING_CART
});
