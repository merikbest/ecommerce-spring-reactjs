import { AppStateType } from "../root-reducer";
import { LoadingStatus, Order } from "../../types/types";
import { OrdersState } from "./orders-reducer";

export const selectOrdersState = (state: AppStateType): OrdersState => state.orders;
export const selectOrders = (state: AppStateType): Array<Order> => selectOrdersState(state).orders;
export const selectIsOrdersLoading = (state: AppStateType): boolean => selectOrdersState(state).loadingState === LoadingStatus.LOADING;
