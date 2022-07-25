export interface PerfumeResponse {
    id: number;
    perfumeTitle: string;
    perfumer: string;
    price: number;
    perfumeRating: number;
    filename: string;
    reviewsCount: number;
    volume: string;
}

export interface FullPerfumeResponse extends PerfumeResponse {
    year: number;
    country: string;
    perfumeGender: string;
    fragranceTopNotes: string;
    fragranceMiddleNotes: string;
    fragranceBaseNotes: string;
    description: string;
    type: string;
    file: any;
}

export interface HeaderResponse<T> {
    items: Array<T>;
    pagesCount: number;
    totalElements: number;
}

export interface UserOrdersRequest {
    email: string;
    page: number;
}

export interface PerfumesSearchRequest {
    searchType: SearchPerfume;
    text: string;
    currentPage: number;
}

export interface PerfumeErrors {
    perfumeTitleError: string;
    perfumerError: string;
    yearError: string;
    countryError: string;
    typeError: string;
    volumeError: string;
    perfumeGenderError: string;
    fragranceTopNotesError: string;
    fragranceMiddleNotesError: string;
    fragranceBaseNotesError: string;
    priceError: string;
}

export interface ReviewResponse {
    id: number;
    author: string;
    message: string;
    rating: number;
    date: any;
}

export interface ReviewRequest {
    perfumeId: number | string;
    author: string;
    message: string;
    rating: number;
}

export interface ReviewError {
    authorError: string;
    messageError: string;
    ratingError: string;
}

export interface OrderResponse {
    id: number;
    totalPrice: number;
    date: string;
    firstName: string;
    lastName: string;
    city: string;
    address: string;
    email: string;
    phoneNumber: string;
    postIndex: number;
}

export interface OrderItemResponse {
    id: number;
    amount: number;
    quantity: number;
    perfume: PerfumeResponse;
}

export interface OrderError {
    emailError: string;
    firstNameError: string;
    lastNameError: string;
    cityError: string;
    addressError: string;
    postIndexError: string;
    phoneNumberError: string;
}

export interface OrderRequest {
    totalPrice?: number;
    perfumesId?: any;
    firstName?: string;
    lastName?: string;
    city?: string;
    address?: string;
    email?: string;
    phoneNumber?: string;
    postIndex?: string;
}

export interface BaseUserResponse {
    id: number;
    email: string;
    firstName: string;
    roles: Array<string>;
    provider: string;
}

export interface UserResponse extends BaseUserResponse {
    lastName: string;
    city: string;
    address: string;
    phoneNumber: string;
    postIndex: string;
    activationCode?: string;
    passwordResetCode?: string;
    active?: boolean;
}

export interface UserEditRequest {
    id: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    city: string | undefined;
    address: string | undefined;
    phoneNumber: string | undefined;
    postIndex: string | undefined;
}

export interface UserEditErrors {
    firstNameError: string;
    lastNameError: string;
}

export interface UserData {
    email: string;
    password: string;
}

export interface UserRegistration {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    password2: string;
    captcha: string | null;
}

export interface UserResetPasswordRequest {
    email?: string;
    password: string;
    password2: string;
}

export interface AuthErrors {
    captchaError: string;
    emailError: string;
    firstNameError: string;
    lastNameError: string;
    passwordError: string;
    password2Error: string;
}

export interface FilterParamsType {
    perfumers: Array<string>;
    genders: Array<string>;
    prices: Array<number>;
    currentPage?: number;
    sortByPrice?: boolean;
}

export interface PerfumePrice {
    id: number;
    name: string;
    array: Array<number>;
}

export enum UserRoles {
    USER = "USER",
    ADMIN = "ADMIN"
}

export enum LoadingStatus {
    LOADED = "LOADED",
    LOADING = "LOADING",
    ERROR = "ERROR",
    NEVER = "NEVER",
    SUCCESS = "SUCCESS"
}

export enum SearchPerfume {
    BRAND = "BRAND",
    PERFUME_TITLE = "PERFUME_TITLE",
    COUNTRY = "COUNTRY"
}
