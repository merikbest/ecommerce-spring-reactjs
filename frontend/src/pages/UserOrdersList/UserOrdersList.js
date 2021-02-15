import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchUserOrders} from "../../redux/thunks/order-thunks";
import OrdersTable from "../../component/OrdersTable/OrdersTable";

const UserOrdersList = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.order.orders);

    useEffect(() => {
        dispatch(fetchUserOrders());
    }, []);

    return (<OrdersTable orders={orders}/>);
};

export default UserOrdersList;
