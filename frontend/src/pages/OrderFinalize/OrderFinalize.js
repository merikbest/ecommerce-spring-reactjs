import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {finalizeOrder} from "../../actions/order-actions";

class OrderFinalize extends Component {

    componentDidMount() {
        this.props.finalizeOrder();
    }

    render() {
        const {orderIndex} = this.props;

        return (
            <div className="container text-center mt-5">
                <h2>Спасибо за заказ!</h2>
                <p>Ваш номер заказа: <span>{orderIndex}</span></p>
            </div>
        );
    }
}

OrderFinalize.propTypes = {
    finalizeOrder: PropTypes.func.isRequired,
    orderIndex: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    orderIndex: state.order.orderIndex
});

export default connect(mapStateToProps, {finalizeOrder})(OrderFinalize);