import { AppStateType } from "../root-reducer";
import { CartState } from "./cart-reducer";
import { LoadingStatus } from "../../types/types";

export const selectCartState = (state: AppStateType): CartState => state.cart;
export const selectTotalPrice = (state: AppStateType): number => selectCartState(state).totalPrice;
export const selectCartItemsCount = (state: AppStateType): number => selectCartState(state).cartItemsCount;
export const selectIsCartLoading = (state: AppStateType): boolean => selectCartState(state).loadingState === LoadingStatus.LOADING;
