export type Perfume = {
    id: number;
    perfumeTitle: string;
    perfumer: string;
    year: number;
    country: string;
    type: string;
    volume: string;
    perfumeGender: string;
    fragranceTopNotes: string;
    fragranceMiddleNotes: string;
    fragranceBaseNotes: string;
    description: string;
    filename: string;
    price: number;
    perfumeRating: number;
    file: any;
    reviews: Array<Review>;
    reviewsCount: number;
};

export type PerfumeHeaderResponse = {
    perfumes: Array<Perfume>;
    pagesCount: number;
    totalElements: number;
};

export type PerfumesSearchRequest = { 
    searchType: SearchPerfume; 
    text: string, 
    currentPage: number 
};

export type PerfumeErrors = {
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
};

export type Review = {
    id: number;
    author: string;
    message: string;
    rating: number;
    date: any;
};

export type ReviewRequest = {
    perfumeId: number | string;
    author: string;
    message: string;
    rating: number;
};

export type ReviewError = {
    authorError: string;
    messageError: string;
    ratingError: string;
};

export type Order = {
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
    orderItems: Array<OrderItem>;
};

export type OrderItem = {
    id: number;
    amount: number;
    quantity: number;
    perfume: Perfume;
};

export type OrderError = {
    emailError: string;
    firstNameError: string;
    lastNameError: string;
    cityError: string;
    addressError: string;
    postIndexError: string;
    phoneNumberError: string;
};

export type OrderRequest = {
    totalPrice?: number;
    perfumesId?: any;
    firstName?: string;
    lastName?: string;
    city?: string;
    address?: string;
    email?: string;
    phoneNumber?: string;
    postIndex?: string;
};

export type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    city: string;
    address: string;
    phoneNumber: string;
    postIndex: string;
    activationCode: string | null;
    passwordResetCode: string | null;
    active: boolean;
    provider: string;
    roles: Array<string>;
};

export type UserEditRequest = {
    id: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    city: string | undefined;
    address: string | undefined;
    phoneNumber: string | undefined;
    postIndex: string | undefined;
};

export type UserEditErrors = {
    firstNameError: string;
    lastNameError: string;
};

export type UserData = {
    email: string;
    password: string;
};

export type UserRegistration = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    password2: string;
    captcha: string | null;
};

export type UserResetPasswordRequest = {
    email?: string;
    password: string;
    password2: string;
};

export type AuthErrors = {
    captchaError: string;
    emailError: string;
    firstNameError: string;
    lastNameError: string;
    passwordError: string;
    password2Error: string;
};

export type FilterParamsType = {
    perfumers: Array<string>;
    genders: Array<string>;
    prices: Array<number>;
    currentPage?: number;
    sortByPrice?: boolean;
};

export type PerfumePrice = {
    id: number;
    name: string;
    array: Array<number>;
};

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
    COUNTRY = "COUNTRY",
}
