import axios from 'axios';

import {API_BASE_URL} from "../../utils/constants/url";
import {Perfume} from "../../types/types";
import {
    calculateCartPriceSuccess,
    clearCartSuccess,
    fetchCartSuccess,
    loadingCart,
    stopLoadingCart
} from "../actions/cart-actions";

export const fetchCart = (data: any) => async (dispatch: any) => {
    dispatch(loadingCart());
    const response: any = await axios.post(API_BASE_URL + "/cart", data);
    const perfumes: Map<number, number> = new Map(JSON.parse(<string>localStorage.getItem("perfumes")));
    let total: number = 0;

    perfumes.forEach((value: number, key: number) => {
        const perfume: Perfume = response.data.find((perfume: { id: number; }) => perfume.id === key);
        total += (perfume.price * value);
    });
    dispatch(fetchCartSuccess(response.data));
    dispatch(calculateCartPriceSuccess(total));
};

export const calculateCartPrice = (perfumes: Array<Perfume> | any) => (dispatch: any) => {
    const perfumesFromLocalStorage: Map<number, number> = new Map(JSON.parse(<string>localStorage.getItem("perfumes")));
    let total: number = 0;

    perfumesFromLocalStorage.forEach((value: number, key: number) => {
        const perfume: Perfume = perfumes.find((perfume: { id: number; }) => perfume.id === key);
        total += perfume.price * value;
    });
    dispatch(calculateCartPriceSuccess(total));
};

export const clearCart = () => (dispatch: any) => {
    dispatch(clearCartSuccess());
};

export const loadCart = () => (dispatch: any) => {
    dispatch(stopLoadingCart());
};
