import {combineReducers} from "redux";

import perfumeReducer from "../reducers/perfume-reducer";
import authReducer from "../reducers/auth-reducer";
import cartReducer from "../reducers/cart-reducer";
import adminReducer from "../reducers/admin-reducer";

const rootReducer = combineReducers({
    perfume: perfumeReducer,
    auth: authReducer,
    cart: cartReducer,
    admin: adminReducer
});

export default rootReducer;