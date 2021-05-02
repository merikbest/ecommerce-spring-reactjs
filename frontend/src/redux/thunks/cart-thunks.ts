import {Perfume} from "../../types/types";
import {
    calculateCartPriceSuccess,
    clearCartSuccess,
    fetchCartSuccess,
    loadingCart,
    stopLoadingCart
} from "../actions/cart-actions";
import {Dispatch} from "redux";
import RequestService from '../../utils/request-service';

export const fetchCart = (data: Array<number>) => async (dispatch: Dispatch) => {
    dispatch(loadingCart());
    const response = await RequestService.post("/users/cart", data);
    const perfumes: Map<number, number> = new Map(JSON.parse(<string>localStorage.getItem("perfumes")));
    let total: number = 0;

    perfumes.forEach((value: number, key: number) => {
        const perfume: Perfume = response.data.find((perfume: { id: number; }) => perfume.id === key);
        total += (perfume.price * value);
    });
    dispatch(fetchCartSuccess(response.data));
    dispatch(calculateCartPriceSuccess(total));
};

export const calculateCartPrice = (perfumes: Array<Perfume> | any) => (dispatch: Dispatch) => {
    const perfumesFromLocalStorage: Map<number, number> = new Map(JSON.parse(<string>localStorage.getItem("perfumes")));
    let total: number = 0;

    perfumesFromLocalStorage.forEach((value: number, key: number) => {
        const perfume: Perfume = perfumes.find((perfume: { id: number; }) => perfume.id === key);
        total += perfume.price * value;
    });
    dispatch(calculateCartPriceSuccess(total));
};

export const clearCart = () => (dispatch: Dispatch) => {
    dispatch(clearCartSuccess());
};

export const loadCart = () => (dispatch: Dispatch) => {
    dispatch(stopLoadingCart());
};
