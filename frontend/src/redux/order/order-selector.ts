import {AppStateType} from "../root-reducer";
import {Order, OrderError} from "../../types/types";
import {OrderState} from "./order-reducer";

export const selectOrderState = (state: AppStateType): OrderState => state.order;
export const selectOrder = (state: AppStateType): Partial<Order> => selectOrderState(state).order;
export const selectOrderErrors = (state: AppStateType): Partial<OrderError> => selectOrderState(state).errors;
export const selectIsOrderLoading = (state: AppStateType): boolean => selectOrderState(state).loading;
