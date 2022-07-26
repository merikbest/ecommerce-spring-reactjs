import { OrderError, OrderItemResponse, OrderRequest, OrderResponse } from "../../../types/types";

export const mockOrderRequest: OrderRequest = {
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    address: "Wall Street1",
    postIndex: "1234567890",
    phoneNumber: "1234567890",
    email: "test123@test.com",
    perfumesId: [33, 34],
    totalPrice: 840
};

export const mockOrder: OrderResponse = {
    id: 1,
    totalPrice: 840,
    date: "2021-04-07",
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    address: "Wall Street1",
    email: "test123@test.com",
    phoneNumber: "1234567890",
    postIndex: 1234567890
};

export const mockOrderItems: Array<OrderItemResponse> = [
    {
        id: 1,
        amount: 384,
        quantity: 2,
        perfume: {
            id: 33,
            perfumeTitle: "Chanel N5",
            perfumer: "Chanel",
            price: 192,
            perfumeRating: 0,
            filename: "4b51181b-5551-4321-b5e7-f7612584c9b2.Chanel N5.jpg",
            reviewsCount: 0,
            volume: "200"
        }
    },
    {
        id: 2,
        amount: 456,
        quantity: 3,
        perfume: {
            id: 34,
            perfumeTitle: "Aventus",
            perfumer: "Creed",
            price: 152,
            perfumeRating: 0,
            filename: "bdb203a9-0725-4ed4-a71a-db7eeb915fae.Creed Aventus.jpg",
            reviewsCount: 0,
            volume: "100"
        }
    }
];

export const mockOrders: Array<OrderResponse> = [
    {
        id: 1,
        totalPrice: 840,
        date: "2021-04-07",
        firstName: "John",
        lastName: "Doe",
        city: "New York",
        address: "Wall Street1",
        email: "test123@test.com",
        phoneNumber: "1234567890",
        postIndex: 1234567890
    },
    {
        id: 2,
        totalPrice: 240,
        date: "2021-04-07",
        firstName: "John",
        lastName: "Doe",
        city: "New York",
        address: "Wall Street1",
        email: "test123@test.com",
        phoneNumber: "1234567890",
        postIndex: 1234567890
    },
    {
        id: 3,
        totalPrice: 163,
        date: "2021-04-07",
        firstName: "Ivan",
        lastName: "Ivanov",
        city: "Moscow",
        address: "Tverskaya street 1",
        email: "ivan123@test.com",
        phoneNumber: "1234567890",
        postIndex: 1234567890
    },
    {
        id: 4,
        totalPrice: 780,
        date: "2021-04-07",
        firstName: "Ivan",
        lastName: "Ivanov",
        city: "Moscow",
        address: "Tverskaya street 1",
        email: "ivan123@test.com",
        phoneNumber: "1234567890",
        postIndex: 1234567890
    },
    {
        id: 5,
        totalPrice: 196,
        date: "2021-04-07",
        firstName: "Ivan",
        lastName: "Ivanov",
        city: "Moscow",
        address: "Tverskaya street 1",
        email: "ivan123@test.com",
        phoneNumber: "1234567890",
        postIndex: 1234567890
    }
];

export const mockOrderErrors: OrderError = {
    emailError: "Email cannot be empty",
    firstNameError: "Fill in the input field",
    lastNameError: "Fill in the input field",
    cityError: "Fill in the input field",
    addressError: "Fill in the input field",
    postIndexError: "Post index cannot be empty",
    phoneNumberError: "Phone number cannot be empty"
};
