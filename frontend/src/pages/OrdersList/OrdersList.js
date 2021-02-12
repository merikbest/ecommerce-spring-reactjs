import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import OrdersTable from "../../component/OrdersTable/OrdersTable";
import {fetchAllUsersOrders} from "../../actions/admin-actions";

const OrdersList = () => {
    const dispatch = useDispatch();
    const adminOrders = useSelector(state => state.admin.orders);

    useEffect(() => {
        dispatch(fetchAllUsersOrders());
    }, []);

    return (<OrdersTable orders={adminOrders}/>);
};

export default OrdersList;
