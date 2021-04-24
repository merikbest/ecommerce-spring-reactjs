import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {clearCart} from "../../../redux/thunks/cart-thunks";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import {Order} from "../../../types/types";

const OrderFinalize: FC = () => {
    const dispatch = useDispatch();
    const order: Partial<Order> = useSelector((state: AppStateType) => state.order.order);

    useEffect(() => {
        dispatch(clearCart());
    }, []);

    return (
        <div className="container text-center mt-5">
            <h2>Thank you for the order!</h2>
            <p>Your order number is: <span>{order.id}</span></p>
        </div>
    );
};

export default OrderFinalize;
