import { AppStateType } from "../root-reducer";
import { AdminState } from "./admin-reducer";
import { LoadingStatus, PerfumeErrors, User } from "../../types/types";

export const selectAdminState = (state: AppStateType): AdminState => state.admin;
export const selectAdminStateUsers = (state: AppStateType): Array<User> => selectAdminState(state).users;
export const selectAdminStateUser = (state: AppStateType): Partial<User> => selectAdminState(state).user;
export const selectAdminStateErrors = (state: AppStateType): Partial<PerfumeErrors> => selectAdminState(state).errors;
export const selectIsPerfumeAdded = (state: AppStateType): boolean => selectAdminState(state).isPerfumeAdded;
export const selectIsPerfumeEdited = (state: AppStateType): boolean => selectAdminState(state).isPerfumeEdited;
export const selectIsPerfumeDeleted = (state: AppStateType): boolean => selectAdminState(state).isPerfumeDeleted;
export const selectIsAdminStateLoading = (state: AppStateType): boolean => selectAdminState(state).loadingState === LoadingStatus.LOADING;
