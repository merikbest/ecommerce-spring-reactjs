import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

import OrdersTable from "../../../component/OrdersTable/OrdersTable";
import Spinner from "../../../component/Spinner/Spinner";
import InfoTitle from "../../../component/InfoTitle/InfoTitle";
import { fetchUserOrders } from "../../../redux/orders/orders-thunks";
import { selectIsOrdersLoading, selectOrders } from "../../../redux/orders/orders-selector";
import "./PersonalOrdersList.css";

const PersonalOrdersList: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const isOrdersLoading = useSelector(selectIsOrdersLoading);

    useEffect(() => {
        dispatch(fetchUserOrders());
    }, []);

    return (
        <>
            {isOrdersLoading ? (
                <Spinner />
            ) : (
                <>
                    {orders.length === 0 ? (
                        <InfoTitle
                            iconClass={"ml-2 mr-2"}
                            icon={faShoppingBag}
                            titleClass={"personal_order_title"}
                            title={"You have no orders"}
                        />
                    ) : (
                        <OrdersTable loading={isOrdersLoading} orders={orders} />
                    )}
                </>
            )}
        </>
    );
};

export default PersonalOrdersList;
