import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {finalizeOrder} from "../../actions/order-actions";
import {clearCart} from "../../actions/cart-actions";

const OrderFinalize = () => {
    const dispatch = useDispatch();
    const orderIndex = useSelector(state => state.order.orderIndex);

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
