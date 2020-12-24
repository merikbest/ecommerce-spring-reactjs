import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {finalizeOrder} from "../../actions/order-actions";

class OrderFinalize extends Component {

    componentDidMount() {
        this.props.finalizeOrder();
    }

    render() {
        const {orderIndex} = this.props.order;

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
    order: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    order: state.order
});

export default connect(mapStateToProps, {finalizeOrder})(OrderFinalize);