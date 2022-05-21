import { combineReducers } from "redux";

import perfumeReducer, { PerfumeState } from "./perfume/perfume-reducer";
import perfumesReducer, { PerfumesState } from "./perfumes/perfumes-reducer";
import authReducer, { AuthState } from "./auth/auth-reducer";
import cartReducer, { CartState } from "./cart/cart-reducer";
import adminReducer, { AdminState } from "./admin/admin-reducer";
import orderReducer, { OrderState } from "./order/order-reducer";
import ordersReducer, { OrdersState } from "./orders/orders-reducer";
import userReducer, { UserState } from "./user/user-reducer";

const rootReducer = combineReducers({
    perfume: perfumeReducer,
    perfumes: perfumesReducer,
    auth: authReducer,
    cart: cartReducer,
    admin: adminReducer,
    order: orderReducer,
    orders: ordersReducer,
    user: userReducer
});

export type AppStateType = {
    perfume: PerfumeState;
    perfumes: PerfumesState;
    auth: AuthState;
    cart: CartState;
    admin: AdminState;
    order: OrderState;
    orders: OrdersState;
    user: UserState;
};

export default rootReducer;
