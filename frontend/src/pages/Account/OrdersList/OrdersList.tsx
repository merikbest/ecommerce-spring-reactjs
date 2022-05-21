import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrdersTable from "../../../component/OrdersTable/OrdersTable";
import { fetchAllUsersOrders } from "../../../redux/orders/orders-thunks";
import { selectIsOrdersLoading, selectOrders } from "../../../redux/orders/orders-selector";
import { resetOrders } from "../../../redux/orders/orders-actions";

const OrdersList: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const adminOrders = useSelector(selectOrders);
    const loading = useSelector(selectIsOrdersLoading);

    useEffect(() => {
        dispatch(fetchAllUsersOrders());

        return () => {
            dispatch(resetOrders());
        };
    }, []);

    return <OrdersTable loading={loading} orders={adminOrders} />;
};

export default OrdersList;
