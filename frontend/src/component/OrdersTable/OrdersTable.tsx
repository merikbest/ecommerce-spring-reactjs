import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingBag} from "@fortawesome/free-solid-svg-icons";

import AccountNavbar from "../AccountNavbar/AccountNavbar";
import {Order} from "../../types/types";

type PropsType = {
    orders: Array<Order>
};

const OrdersTable: FC<PropsType> = ({orders}) => {
    return (
        <div>
            <AccountNavbar/>
            <div className="container mt-5">
                <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faShoppingBag}/> List of all orders</h4>
                <table className="table mt-4">
                    <thead>
                    <tr>
                        <th scope="col">Order №</th>
                        <th scope="col">Date</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Address</th>
                        <th scope="col">Post index</th>
                        <th scope="col">Goods</th>
                        <th scope="col">Sum, $</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => {
                        return (
                            <tr key={order.id}>
                                <th>{order.id}</th>
                                <th>{order.date}</th>
                                <th>{order.firstName + " " + order.lastName}</th>
                                <th>{order.city + " " + order.address}</th>
                                <th>{order.postIndex}</th>
                                <th>
                                    {order.orderItems.map((orderItems) => {
                                        return (
                                            <p key={orderItems.perfume.id}>Id товара:
                                                <Link to={`/product/${orderItems.perfume.id}`}>{orderItems.perfume.id}</Link>
                                            </p>
                                        )
                                    })}
                                </th>
                                <th>{order.totalPrice}</th>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersTable;
