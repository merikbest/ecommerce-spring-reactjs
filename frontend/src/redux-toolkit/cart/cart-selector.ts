import { LoadingStatus, Perfume } from "../../types/types";
import { RootState } from "../../store";
import { CartState } from "./cart-slice";

export const selectCartState = (state: RootState): CartState => state.cart;
export const selectTotalPrice = (state: RootState): number => selectCartState(state).totalPrice;
export const selectCartItemsCount = (state: RootState): number => selectCartState(state).cartItemsCount;
export const selectCartItems = (state: RootState): Array<Perfume> => selectCartState(state).perfumes;
export const selectIsCartLoading = (state: RootState): boolean => selectCartState(state).loadingState === LoadingStatus.LOADING;
