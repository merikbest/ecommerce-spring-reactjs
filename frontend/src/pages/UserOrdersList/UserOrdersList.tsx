import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchUserOrders} from "../../redux/thunks/order-thunks";
import OrdersTable from "../../component/OrdersTable/OrdersTable";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {Order} from "../../types/types";

const UserOrdersList: FC = () => {
    const dispatch = useDispatch();
    const orders: Array<Order> = useSelector((state: AppStateType) => state.order.orders);

    useEffect(() => {
        dispatch(fetchUserOrders());
    }, []);

    return (<OrdersTable orders={orders}/>);
};

export default UserOrdersList;
