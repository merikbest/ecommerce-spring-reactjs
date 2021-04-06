import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import OrdersTable from "../../../component/OrdersTable/OrdersTable";
import {fetchAllUsersOrders} from "../../../redux/thunks/admin-thunks";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import {Order} from "../../../types/types";

const OrdersList: FC = () => {
    const dispatch = useDispatch();
    const adminOrders: Array<Order> = useSelector((state: AppStateType) => state.admin.orders);

    useEffect(() => {
        dispatch(fetchAllUsersOrders());
    }, []);

    return (<OrdersTable orders={adminOrders}/>);
};

export default OrdersList;
