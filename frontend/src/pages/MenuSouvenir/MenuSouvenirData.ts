import { PerfumePrice } from "../../types/types";

// export const perfumer: Array<{ name: string }> = [
//     { name: "Burberry" },
//     { name: "Bvlgari" },
//     { name: "Calvin Klein" },
//     { name: "Carolina Herrera" },
//     { name: "Chanel" },
//     { name: "Creed" },
//     { name: "Dior" },
//     { name: "Dolce&Gabbana" },
//     { name: "Giorgio Armani" },
//     { name: "Gucci" },
//     { name: "Hermes" },
//     { name: "Hugo Boss" },
//     { name: "Jean Paul Gaultier" },
//     { name: "Lancome" },
//     { name: "Paco Rabanne" },
//     { name: "Prada" },
//     { name: "Tom Ford" },
//     { name: "Versace" }
// ];

export const perfumer: Array<{ name: string }> = [
    { name: "Кристали" },
    { name: "Минерали" },
    { name: "Оникс" },
    { name: "Бижута" },
    { name: "Сувенири" },
    { name: "Вещерски неща" },

    // ,    { name: "Carolina Herrera" }
];

export const gender: Array<{ name: string }> = [{ name: "male" }, { name: "female" }];

export const price: Array<PerfumePrice> = [
    { id: 1, name: "Всяка цена", array: [1, 9999] },
    { id: 2, name: "15 - 25 лева", array: [15, 25] },
    { id: 3, name: "25 - 40 лева", array: [25, 40] },
    { id: 4, name: "40 - 90 лева", array: [40, 90] },
    { id: 5, name: "90 - 175+ лева", array: [90, 250] }
];
