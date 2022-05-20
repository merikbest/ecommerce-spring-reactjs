import {AppStateType} from "../root-reducer";
import {AuthState} from "./auth-reducer";
import {AuthErrors, User} from "../../types/types";

export const selectAuthState = (state: AppStateType): AuthState => state.auth;
export const selectUserAuth = (state: AppStateType): Partial<User> => selectAuthState(state).user;
export const selectUserRole = (state: AppStateType): string | null => selectAuthState(state).userRole;
export const selectIsRegistered = (state: AppStateType): boolean => selectAuthState(state).isRegistered;
export const selectIsAuthLoading = (state: AppStateType): boolean => selectAuthState(state).loading;
export const selectSuccessMessage = (state: AppStateType): string => selectAuthState(state).success;
export const selectErrorMessage = (state: AppStateType): string => selectAuthState(state).error;
export const selectErrors = (state: AppStateType): Partial<AuthErrors> => selectAuthState(state).errors;
