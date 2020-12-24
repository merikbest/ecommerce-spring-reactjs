import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import AccountNavbar from "../../component/account-navbar/AccountNavbar";
import {fetchUserOrders} from "../../actions/order-actions";
import {fetchAllUsersOrders} from "../../actions/admin-actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingBag} from "@fortawesome/free-solid-svg-icons";

class OrdersList extends Component {
    state = {
        orders: []
    };

    componentDidMount() {
        if (localStorage.getItem("userRole") === "ADMIN") {
            this.props.fetchAllUsersOrders();
            this.setState({
                orders: this.props.admin.orders
            });
        } else {
            this.props.fetchUserOrders();
            this.setState({
                orders: this.props.order.orders
            });
        }
    }

    render() {
        const {orders} = this.state;

        return (
            <div>
                <AccountNavbar/>
                <div className="container mt-5">
                    <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faShoppingBag}/> Список всех заказов</h4>
                    <table className="table mt-4">
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
                                                    <Link to={`/product/${perfume.id}`}>{perfume.id}</Link>
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
}

OrdersList.propTypes = {
    fetchUserOrders: PropTypes.func.isRequired,
    fetchAllUsersOrders: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    admin: state.admin,
    order: state.order
});

export default connect(mapStateToProps, {fetchUserOrders, fetchAllUsersOrders})(OrdersList);
