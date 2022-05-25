import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoadingStatus, Order, OrderError, OrderItem } from "../../types/types";
import { addOrder, fetchOrderById, fetchOrderItemsByOrderId } from "./order-thunks";

export interface OrderState {
    order: Partial<Order>;
    orderItems: Array<OrderItem>;
    errors: Partial<OrderError>;
    errorMessage: string;
    loadingState: LoadingStatus;
};

const initialState: OrderState = {
    order: {},
    orderItems: [],
    errors: {},
    errorMessage: "",
    loadingState: LoadingStatus.LOADING
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrderLoadingState(state, action: PayloadAction<LoadingStatus>) {
            state.loadingState = action.payload;
        },
        setOrder(state, action: PayloadAction<Order>) {
            state.order = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        setOrderItems(state, action: PayloadAction<Array<OrderItem>>) {
            state.orderItems = action.payload;
        },
        setOrderError(state, action: PayloadAction<string>) {
            state.errorMessage = action.payload;
            state.loadingState = LoadingStatus.ERROR;
        },
        orderAddedFailure(state, action: PayloadAction<OrderError>) {
            state.errors = action.payload;
            state.loadingState = LoadingStatus.ERROR;
        },
        resetOrderState(state) {
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrderById.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchOrderById.fulfilled, (state, action) => {
            state.order = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchOrderById.rejected, (state, action) => {
            state.errorMessage = action.payload!;
            state.loadingState = LoadingStatus.ERROR;
        });
        builder.addCase(fetchOrderItemsByOrderId.fulfilled, (state, action) => {
            state.orderItems = action.payload;
        });
        builder.addCase(addOrder.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(addOrder.fulfilled, (state, action) => {
            state.order = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(addOrder.rejected, (state, action) => {
            state.errors = action.payload!;
            state.loadingState = LoadingStatus.ERROR;
        });
    }
});

export const { setOrderLoadingState, setOrder, setOrderItems, setOrderError, orderAddedFailure, resetOrderState } =
    orderSlice.actions;
export default orderSlice.reducer;
