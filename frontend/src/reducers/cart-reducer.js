import {
    FETCH_CART_SUCCESS,
    LOADING_CART,
    PERFUME_ADDED_TO_CART_SUCCESS,
    PERFUME_REMOVED_FROM_CART_SUCCESS
} from "../constants/actions-types";

const initialState = {
    cartItems: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOADING_CART:
            return {...state, loading: true};

        case FETCH_CART_SUCCESS:
            return {...state, cartItems: payload, loading: false};

        case PERFUME_ADDED_TO_CART_SUCCESS:
            return {...state, cartItems: payload};

        case PERFUME_REMOVED_FROM_CART_SUCCESS:
            return {...state, cartItems: payload};

        default:
            return state;
    }
};

export default reducer;
