import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoadingStatus, Perfume } from "../../types/types";
import { fetchCart } from "./cart-thunks";

export interface CartState {
    loadingState: LoadingStatus;
    totalPrice: number;
    cartItemsCount: number;
}

const initialState: CartState = {
    loadingState: LoadingStatus.LOADING,
    totalPrice: 0,
    cartItemsCount: 0
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        calculateCartPrice(state, action: PayloadAction<Array<Perfume>>) {
            state.totalPrice = calculatePrice(action.payload);
            state.loadingState = LoadingStatus.LOADED;
        },
        setCartItemsCount(state, action: PayloadAction<number>) {
            state.cartItemsCount = action.payload;
        },
        resetCartState(state) {
            state.loadingState = LoadingStatus.LOADING;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.totalPrice = calculatePrice(action.payload);
            state.cartItemsCount = action.payload.length;
            state.loadingState = LoadingStatus.LOADED;
        });
    }
});

export const { calculateCartPrice, setCartItemsCount, resetCartState } = cartSlice.actions;
export default cartSlice.reducer;

const calculatePrice = (perfumes: Array<Perfume>): number => {
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
