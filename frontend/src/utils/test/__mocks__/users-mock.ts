import {
    AuthErrors,
    ReviewError,
    ReviewRequest,
    UserResponse,
    UserEditErrors,
    UserRegistration,
    UserResetPasswordRequest, BaseUserResponse
} from "../../../types/types";

export const userData: UserResponse = {
    id: 2,
    email: "test123@test.com",
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    address: "Wall Street1",
    phoneNumber: "1234567890",
    postIndex: "1234567890",
    provider: "LOCAL",
    active: true,
    roles: ["USER"]
};

export const mockBaseUsersResponse: Array<BaseUserResponse> = [
    {
        id: 2,
        email: "test123@test.com",
        firstName: "John",
        provider: "LOCAL",
        roles: ["USER"]
    }
];

export const mockUserAdmin: UserResponse = {
    id: 1,
    email: "admin@gmail.com",
    firstName: "Admin1",
    roles: ["ADMIN"],
    provider: "LOCAL",
    lastName: "Admin",
    city: "",
    address: "",
    phoneNumber: "",
    postIndex: ""
};

export const userEditErrorsData: UserEditErrors = {
    firstNameError: "First name cannot be empty",
    lastNameError: "Last name cannot be empty"
};

export const authErrorsData: AuthErrors = {
    captchaError: "Fill captcha.",
    emailError: "First name cannot be empty",
    firstNameError: "Last name cannot be empty",
    lastNameError: "The password must be between 6 and 16 characters long",
    passwordError: "The password confirmation must be between 6 and 16 characters long",
    password2Error: "Email cannot be empty"
};

export const reviewData: ReviewRequest = {
    perfumeId: 1,
    author: "John Doe",
    message: "Hello",
    rating: 5
};

export const reviewErrorsData: ReviewError = {
    authorError: "Fill in the input field",
    messageError: "Fill in the input field",
    ratingError: "Chose perfume rating"
};

export const userResetPasswordData: UserResetPasswordRequest = {
    email: "test123@test.com",
    password: "string",
    password2: "string"
};

export const userRegistrationData: UserRegistration = {
    email: "test123@test.com",
    firstName: "John",
    lastName: "Doe",
    password: "test123",
    password2: "test123",
    captcha: "test"
};
