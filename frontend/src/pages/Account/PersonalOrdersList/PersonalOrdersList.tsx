import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingOutlined } from "@ant-design/icons";

import { selectIsOrdersLoading, selectOrders } from "../../../redux-toolkit/orders/orders-selector";
import { fetchUserOrders } from "../../../redux-toolkit/orders/orders-thunks";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import Spinner from "../../../components/Spinner/Spinner";
import { resetOrders } from "../../../redux-toolkit/orders/orders-slice";
import OrdersTable from "../../../components/OrdersTable/OrdersTable";

const PersonalOrdersList: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const isOrdersLoading = useSelector(selectIsOrdersLoading);

    useEffect(() => {
        dispatch(fetchUserOrders(0));

        return () => {
            dispatch(resetOrders());
        };
    }, []);

    return (
        <>
            {isOrdersLoading ? (
                <Spinner />
            ) : (
                <>
                    {orders.length === 0 ? (
                        <div style={{ textAlign: "center" }}>
                            <ContentTitle title={"You have no orders"} titleLevel={4} icon={<ShoppingOutlined />} />
                        </div>
                    ) : (
                        <>
                            <ContentTitle title={"List of all orders"} titleLevel={4} icon={<ShoppingOutlined />} />
                            <OrdersTable loading={isOrdersLoading} orders={orders} fetchOrders={fetchUserOrders} />
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default PersonalOrdersList;
