import { configureStore } from "@reduxjs/toolkit";

import perfumesSlice, { PerfumesState } from "./redux-toolkit/perfumes/perfumes-slice";
import perfumeSlice, { PerfumeState } from "./redux-toolkit/perfume/perfume-slice";
import userSlice, { UserState } from "./redux-toolkit/user/user-slice";
import ordersSlice, { OrdersState } from "./redux-toolkit/orders/orders-slice";
import orderSlice, { OrderState } from "./redux-toolkit/order/order-slice";
import cartSlice, { CartState } from "./redux-toolkit/cart/cart-slice";
import authSlice, { AuthState } from "./redux-toolkit/auth/auth-slice";
import adminSlice, { AdminState } from "./redux-toolkit/admin/admin-slice";

export interface RootState {
    perfumes: PerfumesState;
    perfume: PerfumeState;
    user: UserState;
    orders: OrdersState;
    order: OrderState;
    cart: CartState;
    auth: AuthState;
    admin: AdminState;
}

export const store = configureStore({
    reducer: {
        perfumes: perfumesSlice,
        perfume: perfumeSlice,
        user: userSlice,
        orders: ordersSlice,
        order: orderSlice,
        cart: cartSlice,
        auth: authSlice,
        admin: adminSlice
    }
});
