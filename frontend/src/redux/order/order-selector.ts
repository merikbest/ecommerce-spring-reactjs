import { AppStateType } from "../root-reducer";
import { LoadingStatus, Order, OrderError, OrderItem } from "../../types/types";
import { OrderState } from "./order-reducer";

export const selectOrderState = (state: AppStateType): OrderState => state.order;
export const selectOrder = (state: AppStateType): Partial<Order> => selectOrderState(state).order;
export const selectOrderItems = (state: AppStateType): Array<OrderItem> => selectOrderState(state).orderItems;
export const selectOrderErrors = (state: AppStateType): Partial<OrderError> => selectOrderState(state).errors;

export const selectLoadingStatus = (state: AppStateType): LoadingStatus => selectOrderState(state).loadingState;
export const selectIsOrderLoading = (state: AppStateType): boolean => selectLoadingStatus(state) === LoadingStatus.LOADING;
export const selectIsOrderLoaded = (state: AppStateType): boolean => selectLoadingStatus(state) === LoadingStatus.LOADED;
export const selectOrderError = (state: AppStateType): boolean => selectLoadingStatus(state) === LoadingStatus.ERROR;
