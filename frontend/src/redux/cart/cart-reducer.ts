import {
    CALCULATE_CART_PRICE,
    CartActionTypes,
    LOADING_CART,
    RESET_CART_STATE,
    SET_CART_ITEMS_COUNT
} from "./cart-action-types";
import {Perfume} from "../../types/types";

export type CartState = {
    loading: boolean;
    totalPrice: number;
    cartItemsCount: number;
};

const initialState: CartState = {
    loading: true,
    totalPrice: 0,
    cartItemsCount: 0,
};

const reducer = (state: CartState = initialState, action: CartActionTypes): CartState => {

    switch (action.type) {
        case LOADING_CART:
            return {...state, loading: true};

        case CALCULATE_CART_PRICE:
            return {...state, totalPrice: calculateCartPrice(action.payload), loading: false};

        case SET_CART_ITEMS_COUNT:
            return {...state, cartItemsCount: action.payload};

        case RESET_CART_STATE:
            return {...state, loading: true};

        default:
            return state;
    }
};

export default reducer;


const calculateCartPrice = (perfumes: Array<Perfume>): number => {
    const perfumesFromLocalStorage: Map<number, number> = new Map(JSON.parse(<string>localStorage.getItem("perfumes")));
    let total = 0;

    perfumesFromLocalStorage.forEach((value, key) => {
        const perfume = perfumes.find((perfume) => perfume.id === key);

        if (perfume) {
            total += perfume.price * value;
        }
    });
    return total;
};