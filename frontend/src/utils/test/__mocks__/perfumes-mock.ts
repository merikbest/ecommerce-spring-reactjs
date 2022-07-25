import { FullPerfumeResponse, PerfumeErrors, PerfumeResponse, ReviewResponse } from "../../../types/types";

export const mockFullPerfumeResponse: FullPerfumeResponse = {
    id: 34,
    perfumer: "Creed",
    perfumeTitle: "Aventus",
    country: "France",
    description: "",
    file: null,
    filename: "bdb203a9-0725-4ed4-a71a-db7eeb915fae.Creed Aventus.jpg",
    fragranceBaseNotes: "Ambergris, Oakmoss, Musk",
    fragranceMiddleNotes: "Birch, Jasmine, Patchouli",
    fragranceTopNotes: "Pineapple, Apple, Bergamot, Blackcurrant",
    perfumeGender: "male",
    perfumeRating: 0,
    price: 152,
    reviewsCount: 0,
    type: "Eau de parfum",
    volume: "100",
    year: 2010
};

export const mockCartPerfumesResponse: Array<PerfumeResponse> = [
    {
        id: 17,
        perfumeTitle: "Le Gemme Ashlemah",
        perfumer: "Bvlgari",
        price: 171,
        perfumeRating: 0,
        filename:
            "https://perfumeweb2.s3.eu-central-1.amazonaws.com/956bbe26-c07d-4e32-a567-5e4306388c0e.Bvlgari Le Gemme Ashlemah.jpg",
        reviewsCount: 0,
        volume: "100"
    },
    {
        id: 27,
        perfumeTitle: "Good Girl",
        perfumer: "Carolina Herrera",
        price: 156,
        perfumeRating: 0,
        filename:
            "https://perfumeweb2.s3.eu-central-1.amazonaws.com/184c9da2-2445-4b01-87b8-b4f8b5f6ab8c.Carolina Herrera Good Girl.jpg",
        reviewsCount: 0,
        volume: "150"
    }
];

export const mockPerfumesResponse: Array<PerfumeResponse> = [
    {
        id: 34,
        perfumer: "Creed",
        perfumeTitle: "Aventus",
        price: 152,
        perfumeRating: 0,
        filename: "bdb203a9-0725-4ed4-a71a-db7eeb915fae.Creed Aventus.jpg",
        reviewsCount: 0,
        volume: "100",
    },
    {
        id: 35,
        perfumer: "Creed",
        perfumeTitle: "Bois du Portugal",
        price: 110,
        perfumeRating: 0,
        filename: "162cfbe2-2dc2-4271-8a63-23981a7e3cc4.Creed Bois du Portugal.jpg",
        reviewsCount: 0,
        volume: "100",
    },
    {
        id: 38,
        perfumer: "Creed",
        perfumeTitle: "Aventus for Her",
        price: 141,
        perfumeRating: 0,
        filename: "7d32f694-9cc3-4770-844a-47400e6f5c6b.Creed Aventus for Her.jpg",
        reviewsCount: 0,
        volume: "75",
    }
];

export const mockReviews: Array<ReviewResponse> = [
    { id: 1, author: "John Doe", message: "Hello world", rating: 4, date: "2021-05-08" },
    { id: 2, author: "John Doe", message: "Hello world", rating: 5, date: "2021-05-08" },
    { id: 3, author: "John Doe", message: "Seems good.", rating: 5, date: "2021-05-08" }
];

export const perfumeErrorData: PerfumeErrors = {
    perfumeTitleError: "Fill in the input field",
    perfumerError: "Fill in the input field",
    yearError: "Fill in the input field",
    countryError: "Fill in the input field",
    typeError: "Fill in the input field",
    volumeError: "Fill in the input field",
    perfumeGenderError: "Fill in the input field",
    fragranceTopNotesError: "Fill in the input field",
    fragranceMiddleNotesError: "Fill in the input field",
    fragranceBaseNotesError: "Fill in the input field",
    priceError: "Fill in the input field"
};
