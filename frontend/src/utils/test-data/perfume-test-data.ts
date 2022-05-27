import {Perfume, PerfumeErrors} from "../../types/types";

export const perfumeData: Perfume = {
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
    reviews: [
        {id: 1, author: "John Doe", message: "Hello world", rating: 4, date: "2021-05-08"},
        {id: 2, author: "John Doe", message: "Hello world", rating: 5, date: "2021-05-08"},
        {id: 3, author: "John Doe", message: "Seems good.", rating: 5, date: "2021-05-08"}
    ],
    type: "Eau de parfum",
    volume: "100",
    year: 2010
};

export const perfumesData: Array<Perfume> = [
    {
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
        reviews: [
            {id: 1, author: "John Doe", message: "Hello world", rating: 4, date: "2021-05-08"},
            {id: 2, author: "John Doe", message: "Hello world", rating: 5, date: "2021-05-08"},
            {id: 3, author: "John Doe", message: "Seems good.", rating: 5, date: "2021-05-08"}
        ],
        type: "Eau de parfum",
        volume: "100",
        year: 2010
    },
    {
        id: 35,
        perfumer: "Creed",
        perfumeTitle: "Bois du Portugal",
        country: "France",
        description: "",
        file: null,
        filename: "162cfbe2-2dc2-4271-8a63-23981a7e3cc4.Creed Bois du Portugal.jpg",
        fragranceBaseNotes: "Sandalwood, Vetiver, Ambergris",
        fragranceMiddleNotes: "Cedarwood",
        fragranceTopNotes: "Bergamot, Lavender",
        perfumeGender: "male",
        perfumeRating: 0,
        price: 110,
        reviews: [],
        type: "Eau de parfum",
        volume: "100",
        year: 1987
    },
    {
        id: 38,
        perfumer: "Creed",
        perfumeTitle: "Aventus for Her",
        country: "France",
        description: "",
        file: null,
        filename: "7d32f694-9cc3-4770-844a-47400e6f5c6b.Creed Aventus for Her.jpg",
        fragranceBaseNotes: "Peach, Blackcurrant, Ylang-ylang",
        fragranceMiddleNotes: "Rose, Styrax, Mysore sandalwood",
        fragranceTopNotes: "Green apple, Violet leaf, Calabrian bergamot",
        perfumeGender: "female",
        perfumeRating: 0,
        price: 141,
        reviews: [],
        type: "Eau de parfum",
        volume: "75",
        year: 2016
    }
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
    priceError: "Fill in the input field",
};
