import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {fetchUserOrders} from "../../actions/order-actions";
import OrdersTable from "../../component/OrdersTable/OrdersTable";

class UserOrdersList extends Component {

    componentDidMount() {
        this.props.fetchUserOrders();
    }

    render() {
        return (
            <OrdersTable orders={this.props.orders}/>
        );
    }
}

UserOrdersList.propTypes = {
    fetchUserOrders: PropTypes.func.isRequired,
    orders: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    orders: state.order.orders
});

export default connect(mapStateToProps, {fetchUserOrders})(UserOrdersList);
