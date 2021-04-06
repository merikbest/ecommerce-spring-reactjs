import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {finalizeOrder} from "../../../redux/thunks/order-thunks";
import {clearCart} from "../../../redux/thunks/cart-thunks";
import {AppStateType} from "../../../redux/reducers/root-reducer";

const OrderFinalize: FC = () => {
    const dispatch = useDispatch();
    const orderIndex: string = useSelector((state: AppStateType) => state.order.orderIndex);

    useEffect(() => {
        dispatch(clearCart());
        dispatch(finalizeOrder());
    }, []);

    return (
        <div className="container text-center mt-5">
            <h2>Thank you for the order!</h2>
            <p>Your order number is: <span>{orderIndex}</span></p>
        </div>
    );
};

export default OrderFinalize;
