import { LoadingStatus, OrderResponse, OrderError, OrderItemResponse } from "../../types/types";
import { RootState } from "../../store";
import { OrderState } from "./order-slice";

export const selectOrderState = (state: RootState): OrderState => state.order;
export const selectOrder = (state: RootState): Partial<OrderResponse> => selectOrderState(state).order;
export const selectOrderItems = (state: RootState): Array<OrderItemResponse> => selectOrderState(state).orderItems;
export const selectOrderErrors = (state: RootState): Partial<OrderError> => selectOrderState(state).errors;

export const selectLoadingStatus = (state: RootState): LoadingStatus => selectOrderState(state).loadingState;
export const selectIsOrderLoading = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.LOADING;
export const selectIsOrderLoaded = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.LOADED;
export const selectOrderError = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.ERROR;
