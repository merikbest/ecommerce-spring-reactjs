import {AppStateType} from "../root-reducer";
import {CartState} from "./cart-reducer";
import {Perfume} from "../../types/types";

export const selectCartState = (state: AppStateType): CartState => state.cart;
export const selectCartItems = (state: AppStateType): Array<Perfume> => selectCartState(state).perfumes;
export const selectIsCartLoading = (state: AppStateType): boolean => selectCartState(state).loading;
export const selectTotalPrice= (state: AppStateType): number => selectCartState(state).totalPrice;
