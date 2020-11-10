import React, {useEffect, useState} from 'react';
import ShopService from "../../../services/ShopService";
import {Link} from "react-router-dom";
import AccountNavbar from "../../parts/account-navbar/AccountNavbar";

function OrdersList(props) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("userRole") === "ADMIN") {
            ShopService.getAllOrders()
                .then((response) => {
                    setOrders(response.data);
                });
        } else {
            ShopService.getUserOrders()
                .then((response) => {
                    setOrders(response.data);
                });
        }
    }, []);

    return (
        <div>
            <AccountNavbar/>
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Заказ №</th>
                        <th scope="col">Дата</th>
                        <th scope="col">Заказчик</th>
                        <th scope="col">Адресс</th>
                        <th scope="col">Почтовый индекс</th>
                        <th scope="col">Товары</th>
                        <th scope="col">Сумма, грн.</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    {orders.map((order) => {
                        return (
                            <tbody>
                            <tr>
                                <th>{order.id}</th>
                                <th>{order.date}</th>
                                <th>{order.firstName + " " + order.lastName}</th>
                                <th>{order.city + " " + order.address}</th>
                                <th>{order.postIndex}</th>
                                <th>
                                    {order.perfumeList.map((perfume) => {
                                        return (
                                            <p>Id товара:
                                                <Link to={`/rest/product/${perfume.id}`}>{perfume.id}</Link>
                                            </p>
                                        )
                                    })}
                                </th>
                                <th>{order.totalPrice}</th>
                            </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>
    );
}

export default OrdersList;