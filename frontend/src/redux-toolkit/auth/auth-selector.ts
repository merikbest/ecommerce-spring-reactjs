import { AuthErrors, LoadingStatus } from "../../types/types";
import { RootState } from "../../store";
import { AuthState } from "./auth-slice";

export const selectAuthState = (state: RootState): AuthState => state.auth;
export const selectUserAuthEmail = (state: RootState): string => selectAuthState(state).email;
export const selectIsRegistered = (state: RootState): boolean => selectAuthState(state).isRegistered;
export const selectSuccessMessage = (state: RootState): string => selectAuthState(state).success;
export const selectErrorMessage = (state: RootState): string => selectAuthState(state).error;
export const selectErrors = (state: RootState): Partial<AuthErrors> => selectAuthState(state).errors;
export const selectIsAuthLoading = (state: RootState): boolean => selectAuthState(state).loadingState === LoadingStatus.LOADING;
