import {
    CALCULATE_CART_PRICE_SUCCESS,
    CLEAR_CART,
    FETCH_CART_SUCCESS,
    LOADING_CART,
    STOP_LOADING_CART
} from "../utils/constants/actions-types";
import {Perfume} from "../types/types";

type InitialStateType = {
    perfumes: Array<Perfume>
    loading: boolean
    totalPrice: number
};

const initialState: InitialStateType = {
    perfumes: [],
    loading: false,
    totalPrice: 0
};

const reducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    const {type, payload} = action;

    switch (type) {
        case LOADING_CART:
            return {...state, loading: true};

        case FETCH_CART_SUCCESS:
            return {...state, perfumes: payload, loading: false};

        case CALCULATE_CART_PRICE_SUCCESS:
            return {...state, totalPrice: payload, loading: false};

        case STOP_LOADING_CART:
            return {...state, loading: false, perfumes: []};

        case CLEAR_CART:
            return {...state, perfumes: []};

        default:
            return state;
    }
};

export default reducer;
