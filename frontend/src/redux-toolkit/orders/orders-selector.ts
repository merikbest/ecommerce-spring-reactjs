import { LoadingStatus, OrderResponse } from "../../types/types";
import { RootState } from "../../store";
import { OrdersState } from "./orders-slice";

export const selectOrdersState = (state: RootState): OrdersState => state.orders;
export const selectOrders = (state: RootState): Array<OrderResponse> => selectOrdersState(state).orders;
export const selectPagesCount = (state: RootState): number => selectOrdersState(state).pagesCount;
export const selectTotalElements = (state: RootState): number => selectOrdersState(state).totalElements;
export const selectIsOrdersLoading = (state: RootState): boolean => selectOrdersState(state).loadingState === LoadingStatus.LOADING;
