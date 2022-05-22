import { AppStateType } from "../root-reducer";
import { AuthState } from "./auth-reducer";
import { AuthErrors, LoadingStatus } from "../../types/types";

export const selectAuthState = (state: AppStateType): AuthState => state.auth;
export const selectUserAuthEmail = (state: AppStateType): string => selectAuthState(state).email;
export const selectIsRegistered = (state: AppStateType): boolean => selectAuthState(state).isRegistered;
export const selectSuccessMessage = (state: AppStateType): string => selectAuthState(state).success;
export const selectErrorMessage = (state: AppStateType): string => selectAuthState(state).error;
export const selectErrors = (state: AppStateType): Partial<AuthErrors> => selectAuthState(state).errors;
export const selectIsAuthLoading = (state: AppStateType): boolean => selectAuthState(state).loadingState === LoadingStatus.LOADING;
