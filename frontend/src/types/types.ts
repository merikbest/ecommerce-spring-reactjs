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
    date: any
};

export type ReviewError = {
    authorError: string
    messageError: string
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
    username: string
    email: string
    active: boolean
    activationCode: string | null
    passwordResetCode: string | null
    token: string | null
    roles: string
};

export type AuthErrors = {
    captchaError: string
    emailError: string
    usernameError: string
    passwordError: string
    password2Error: string
};
