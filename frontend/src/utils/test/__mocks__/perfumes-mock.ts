import { FullPerfumeResponse, PerfumeErrors, PerfumeResponse, ReviewResponse } from "../../../types/types";

// export const mockFullPerfumeResponse: FullPerfumeResponse = {
//     id: 34,
//     perfumer: "Creed",
//     perfumeTitle: "Aventus",
//     country: "France",
//     description: "",
//     file: null,
//     filename: "bdb203a9-0725-4ed4-a71a-db7eeb915fae.Creed Aventus.jpg",
//     fragranceBaseNotes: "Ambergris, Oakmoss, Musk",
//     fragranceMiddleNotes: "Birch, Jasmine, Patchouli",
//     fragranceTopNotes: "Pineapple, Apple, Bergamot, Blackcurrant",
//     perfumeGender: "male",
//     perfumeRating: 0,
//     price: 152,
//     reviewsCount: 0,
//     type: "Eau de parfum",
//     volume: "100",
//     year: 2010,
//     imageData: null,
//     imageName: '';
//     imageType: '';
// };

export const mockCartPerfumesResponse: Array<PerfumeResponse> = [
   
];

export const mockPerfumesResponse: Array<PerfumeResponse> = [
 
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
