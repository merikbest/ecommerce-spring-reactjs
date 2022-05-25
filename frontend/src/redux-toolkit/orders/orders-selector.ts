import { LoadingStatus, Order } from "../../types/types";
import { RootState } from "../../store-rtk";
import { OrdersState } from "../../redux/orders/orders-reducer";

export const selectOrdersState = (state: RootState): OrdersState => state.orders;
export const selectOrders = (state: RootState): Array<Order> => selectOrdersState(state).orders;
export const selectIsOrdersLoading = (state: RootState): boolean => selectOrdersState(state).loadingState === LoadingStatus.LOADING;
