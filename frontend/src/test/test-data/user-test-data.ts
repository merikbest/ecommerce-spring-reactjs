import {
    AuthErrors,
    ReviewData,
    ReviewError,
    User,
    UserEditErrors,
    UserRegistration,
    UserResetPasswordData
} from "../../types/types";

export const userData: User = {
    "id": 2,
    "email": "test123@test.com",
    "firstName": "John",
    "lastName": "Doe",
    "city": "New York",
    "address": "Wall Street1",
    "phoneNumber": "1234567890",
    "postIndex": "1234567890",
    "provider": "LOCAL",
    "active": true,
    "activationCode": null,
    "passwordResetCode": null,
    "roles": ["USER"]
};

export const usersData: Array<User> = [{
    "id": 2,
    "email": "test123@test.com",
    "firstName": "John",
    "lastName": "Doe",
    "city": "New York",
    "address": "Wall Street1",
    "phoneNumber": "1234567890",
    "postIndex": "1234567890",
    "provider": "LOCAL",
    "active": true,
    "activationCode": null,
    "passwordResetCode": null,
    "roles": ["USER"]
}];

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

export const reviewData: ReviewData = {
    "perfumeId": 1,
    "author": "John Doe",
    "message": "Hello",
    "rating": 5
};

export const reviewErrorsData: ReviewError = {
    authorError: "Fill in the input field",
    messageError: "Fill in the input field",
    ratingError: "Chose perfume rating"
};

export const userResetPasswordData: UserResetPasswordData = {
    "email": "test123@test.com",
    "password": "string",
    "password2": "string"
};

export const userRegistrationData: UserRegistration = {
    "email": "test123@test.com",
    "firstName": "John",
    "lastName": "Doe",
    "password": "test123",
    "password2": "test123",
    "captcha": "test",
};
