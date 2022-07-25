import { AuthErrors, LoadingStatus, ReviewError, UserResponse, UserEditErrors } from "../../types/types";
import { RootState } from "../../store";
import { UserState } from "./user-slice";

export const selectUserState = (state: RootState): UserState => state.user;
export const selectUserFromUserState = (state: RootState): UserResponse | undefined => selectUserState(state).user;
export const selectSuccessMessage = (state: RootState): string => selectUserState(state).successMessage;
export const selectUserEditErrors = (state: RootState): Partial<UserEditErrors> => selectUserState(state).userEditErrors;
export const selectUserResetPasswordErrors = (state: RootState): Partial<AuthErrors> => selectUserState(state).userResetPasswordErrors;
export const selectReviewErrors = (state: RootState): Partial<ReviewError> => selectUserState(state).reviewErrors;
export const selectIsReviewAdded = (state: RootState): boolean => selectUserState(state).isReviewAdded;
export const selectIsUserLoading = (state: RootState): boolean => selectUserState(state).loadingState === LoadingStatus.LOADING;
