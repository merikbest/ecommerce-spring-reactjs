export type Perfume = {
    id: number
    perfumeTitle: string
    perfumer: string
    year: number
    country: string
    type: string
    volume: string
    perfumeGender: string
    fragranceTopNotes: string
    fragranceMiddleNotes: string
    fragranceBaseNotes: string
    description: string
    filename: string
    price: number
    perfumeRating: number
    file: any
    reviews: Array<Review>
};

export type PerfumeErrors = {
    perfumeTitleError: string
    perfumerError: string
    yearError: string
    countryError: string
    typeError: string
    volumeError: string
    perfumeGenderError: string
    fragranceTopNotesError: string
    fragranceMiddleNotesError: string
    fragranceBaseNotesError: string
    priceError: string
};

export type Review = {
    id: number
    author: string
    message: string
    rating: number
    date: any
};

export type ReviewData = {
    perfumeId: number | string
    author: string
    message: string
    rating: number
};

export type ReviewError = {
    authorError: string
    messageError: string
    ratingError: string
};

export type Order = {
    id: number
    totalPrice: number
    date: string
    firstName: string
    lastName: string
    city: string
    address: string
    email: string
    phoneNumber: string
    postIndex: number
    orderItems: Array<OrderItem>
};

export type OrderItem = {
    id: number
    amount: number
    quantity: number
    perfume: Perfume
};

export type OrderError = {
    emailError: string
    firstNameError: string
    lastNameError: string
    cityError: string
    addressError: string
    postIndexError: string
    phoneNumberError: string
};

export type User = {
    id: number
    email: string
    firstName: string
    lastName: string
    city: string
    address: string
    phoneNumber: string
    postIndex: string
    activationCode: string | null
    passwordResetCode: string | null
    active: boolean
    provider: string
    roles: Array<string>
};

export type UserEdit = {
    id: number | undefined
    firstName: string | undefined
    lastName: string | undefined
    city: string | undefined
    address: string | undefined
    phoneNumber: string | undefined
    postIndex: string | undefined
};

export type UserEditErrors = {
    firstNameError: string
    lastNameError: string
};

export type UserData = {
    email: string
    password: string
};

export type UserRegistration = {
    email: string
    firstName: string
    lastName: string
    password: string
    password2: string
    captcha: string | null
};

export type UserResetPasswordData = {
    email: string | undefined
    password: string
    password2: string
};

export type AuthErrors = {
    captchaError: string
    emailError: string
    firstNameError: string
    lastNameError: string
    passwordError: string
    password2Error: string
};

export type FilterParamsType = {
    perfumers: Array<string>
    genders: Array<string>
    prices: Array<number>
    sortByPrice?: boolean
};

export type PerfumePrice = {
    id: number
    name: string
    array: Array<number>
};

export type BrandType = {
    name: string
    url: string
};
