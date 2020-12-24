import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {fetchOrder, addOrder} from "../../actions/order-actions";
import {faCheckCircle, faShoppingBag} from "@fortawesome/free-solid-svg-icons";
import {IMG_URL} from "../../constants/url";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Order extends Component {
    state = {
        firstName: "",
        lastName: "",
        city: "",
        address: "",
        postIndex: "",
        phoneNumber: "",
        email: ""
    };

    componentDidMount() {
        this.props.fetchOrder();
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        let totalPrice = 0;
        this.props.order.perfumes.map((perfume) => totalPrice = totalPrice + perfume.price);

        const perfumeList = this.props.order.perfumes;
        const {firstName, lastName, city, address, postIndex, phoneNumber, email} = this.state;
        const order = {firstName, lastName, city, address, postIndex, phoneNumber, email, perfumeList, totalPrice};

        this.props.addOrder(order, this.props.history);
    };

    handleInputChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {firstName, lastName, city, address, postIndex, phoneNumber, email} = this.state;
        const {perfumes} = this.props.order;
        const {
            firstNameError, lastNameError, cityError, addressError, postIndexError, phoneNumberError,
            emailError
        } = this.props.order.errors;

        let totalPrice = 0;
        this.props.order.perfumes.map((perfume) => totalPrice = totalPrice + perfume.price);

        return (
            <div className="container mt-5 pb-5">
                <h4 className="mb-4 text-center">
                    <FontAwesomeIcon className="mr-2" icon={faShoppingBag}/> Оформление заказа
                </h4>
                <br/>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Имя:</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className={firstNameError ? "form-control is-invalid" : "form-control"}
                                    name="firstName"
                                    value={firstName}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{firstNameError}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Фамилия:</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className={lastNameError ? "form-control is-invalid" : "form-control"}
                                    name="lastName"
                                    value={lastName}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{lastNameError}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Город:</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className={cityError ? "form-control is-invalid" : "form-control"}
                                    name="city"
                                    value={city}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{cityError}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Адрес:</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className={addressError ? "form-control is-invalid" : "form-control"}
                                    name="address"
                                    value={address}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{addressError}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Индекс:</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className={postIndexError ? "form-control is-invalid" : "form-control"}
                                    name="postIndex"
                                    value={postIndex}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{postIndexError}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Телефон:</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className={phoneNumberError ? "form-control is-invalid" : "form-control"}
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{phoneNumberError}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Email:</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className={emailError ? "form-control is-invalid" : "form-control"}
                                    name="email"
                                    value={email}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{emailError}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="container-fluid">
                            <div className="row">
                                {perfumes.map((perfume) => {
                                    return (
                                        <div className="col-lg-6 d-flex align-items-stretch">
                                            <div className="card mb-5">
                                                <img src={IMG_URL + `${perfume.filename}`}
                                                     className="rounded mx-auto w-50"/>
                                                <div className="card-body text-center">
                                                    <h5>{perfume.perfumeTitle}</h5>
                                                    <h6>{perfume.perfumer}</h6>
                                                    <h6><span>{perfume.price}</span>,00 грн.</h6>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <button className="btn btn-primary btn-lg btn-success px-5 float-right"
                                onClick={this.onFormSubmit}>
                            <FontAwesomeIcon icon={faCheckCircle}/> Подтвердить заказ
                        </button>
                        <div className="row">
                            <h4>К оплате : <span>{totalPrice}</span> грн.</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Order.propTypes = {
    fetchOrder: PropTypes.func.isRequired,
    addOrder: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    order: state.order
});

export default connect(mapStateToProps, {fetchOrder, addOrder})(Order);
