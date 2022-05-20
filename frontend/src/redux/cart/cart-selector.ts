import {AppStateType} from "../root-reducer";
import {CartState} from "./cart-reducer";

export const selectCartState = (state: AppStateType): CartState => state.cart;
export const selectIsCartLoading = (state: AppStateType): boolean => selectCartState(state).loading;
export const selectTotalPrice = (state: AppStateType): number => selectCartState(state).totalPrice;
export const selectCartItemsCount = (state: AppStateType): number => selectCartState(state).cartItemsCount;
