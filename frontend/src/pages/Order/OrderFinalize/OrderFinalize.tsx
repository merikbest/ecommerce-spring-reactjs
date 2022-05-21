import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectOrder } from "../../../redux/order/order-selector";
import { resetCartState } from "../../../redux/cart/cart-actions";

const OrderFinalize: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const order = useSelector(selectOrder);

    useEffect(() => {
        dispatch(resetCartState());
    }, []);

    return (
        <div className="container text-center mt-5">
            <h2>Thank you for the order!</h2>
            <p>
                Your order number is: <span>{order.id}</span>
            </p>
        </div>
    );
};

export default OrderFinalize;
