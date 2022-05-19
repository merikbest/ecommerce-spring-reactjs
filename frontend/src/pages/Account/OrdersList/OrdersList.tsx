import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import OrdersTable from "../../../component/OrdersTable/OrdersTable";
import {fetchAllUsersOrders} from "../../../redux/admin/admin-thunks";
import {selectAdminStateOrders, selectIsAdminStateLoaded} from "../../../redux/admin/admin-selector";

const OrdersList: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const adminOrders = useSelector(selectAdminStateOrders);
    const loading = useSelector(selectIsAdminStateLoaded);

    useEffect(() => {
        dispatch(fetchAllUsersOrders());
    }, []);

    return <OrdersTable loading={loading} orders={adminOrders}/>;
};

export default OrdersList;
