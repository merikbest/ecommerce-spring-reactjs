import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {clearCart} from "../../../redux/cart/cart-thunks";
import {selectOrder} from "../../../redux/order/order-selector";

const OrderFinalize: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const order = useSelector(selectOrder);

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
