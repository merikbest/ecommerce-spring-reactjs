import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

import { Order } from "../../types/types";
import Spinner from "../Spinner/Spinner";
import InfoTitle from "../InfoTitle/InfoTitle";
import { ACCOUNT_USER_ORDERS } from "../../constants/routeConstants";

type PropsType = {
    orders: Array<Order>;
    loading: boolean;
};

const OrdersTable: FC<PropsType> = ({ loading, orders }): ReactElement => {
    return (
        <div className="container">
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <InfoTitle iconClass={"ml-2 mr-2"} icon={faShoppingBag} title={"List of all orders"} />
                    <table className="table mt-4 border text-center">
                        <thead className="table-active">
                            <tr>
                                <th>Order №</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Email</th>
                                <th>Sum, $</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order: Order) => (
                                <tr key={order.id}>
                                    <th>{order.id}</th>
                                    <th>{order.date}</th>
                                    <th>{order.firstName + " " + order.lastName}</th>
                                    <th>{order.email}</th>
                                    <th>{order.totalPrice}</th>
                                    <th>
                                        <Link to={`${ACCOUNT_USER_ORDERS}/${order.id}`}>
                                            Show more
                                        </Link>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default OrdersTable;
