import { AppStateType } from "../root-reducer";
import { UserState } from "./user-reducer";
import { AuthErrors, LoadingStatus, ReviewError, User, UserEditErrors } from "../../types/types";

export const selectUserState = (state: AppStateType): UserState => state.user;
export const selectUserFromUserState = (state: AppStateType): User | undefined => selectUserState(state).user;
export const selectSuccessMessage = (state: AppStateType): string => selectUserState(state).successMessage;
export const selectUserEditErrors = (state: AppStateType): Partial<UserEditErrors> => selectUserState(state).userEditErrors;
export const selectUserResetPasswordErrors = (state: AppStateType): Partial<AuthErrors> => selectUserState(state).userResetPasswordErrors;
export const selectReviewErrors = (state: AppStateType): Partial<ReviewError> => selectUserState(state).reviewErrors;
export const selectIsReviewAdded = (state: AppStateType): boolean => selectUserState(state).isReviewAdded;
export const selectIsUserLoading = (state: AppStateType): boolean => selectUserState(state).loadingState === LoadingStatus.LOADING;
