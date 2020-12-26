import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {fetchAllUsersOrders} from "../../actions/admin-actions";
import OrdersTable from "../../component/OrdersTable/OrdersTable";

class OrdersList extends Component {

    componentDidMount() {
        this.props.fetchAllUsersOrders();
    }

    render() {
        return (
            <OrdersTable orders={this.props.adminOrders}/>
        );
    }
}

OrdersList.propTypes = {
    fetchAllUsersOrders: PropTypes.func.isRequired,
    adminOrders: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    adminOrders: state.admin.orders,
});

export default connect(mapStateToProps, {fetchAllUsersOrders})(OrdersList);
