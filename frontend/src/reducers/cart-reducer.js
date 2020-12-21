import {FETCH_CART, PERFUME_ADDED_TO_CART, PERFUME_REMOVED_FROM_CART} from "../constants/actions-types";

const initialState = {
    cartItems: []
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case FETCH_CART:
            return {...state, cartItems: payload};

        case PERFUME_ADDED_TO_CART:
            return {...state, cartItems: payload};

        case PERFUME_REMOVED_FROM_CART:
            return {...state, cartItems: payload};

        default:
            return state;
    }
};

export default reducer;
