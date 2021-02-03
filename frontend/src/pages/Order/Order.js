import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faShoppingBag} from "@fortawesome/free-solid-svg-icons";

import {IMG_URL} from "../../utils/constants/url";
import {addOrder, fetchOrder} from "../../actions/order-actions";
import {validateEmail} from "../../utils/input-validators";

class Order extends Component {
    state = {
        firstName: "",
        lastName: "",
        city: "",
        address: "",
        postIndex: "",
        phoneNumber: "",
        email: "",
        validateEmailError: ""
    };

    componentDidMount() {
        this.props.fetchOrder();
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const perfumesId = Object.fromEntries(new Map(JSON.parse(localStorage.getItem("perfumes"))));
        const {firstName, lastName, city, address, postIndex, phoneNumber, email} = this.state;
        const {totalPrice} = this.props;
        const validateEmailError = validateEmail(email);

        if (validateEmailError) {
            this.setState({
                validateEmailError
            });
        } else {
            this.setState({
                validateEmailError: ""
            });
            const order = {firstName, lastName, city, address, postIndex, phoneNumber, email, perfumesId, totalPrice};
            this.props.addOrder(order, this.props.history);
        }
    };

    handleInputChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const perfumesFromLocalStorage = new Map(JSON.parse(localStorage.getItem("perfumes")));
        const {perfumes, totalPrice} = this.props;
        const {firstName, lastName, city, address, postIndex, phoneNumber, email, validateEmailError} = this.state;
        const {
            firstNameError,
            lastNameError,
            cityError,
            addressError,
            postIndexError,
            phoneNumberError,
            emailError
        } = this.props.errors;

        return (
            <div className="container mt-5 pb-5">
                <h4 className="mb-4 text-center">
                    <FontAwesomeIcon className="mr-2" icon={faShoppingBag}/> Ordering
                </h4>
                <br/>
                <form onSubmit={this.onFormSubmit}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Name:</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={firstNameError ? "form-control is-invalid" : "form-control"}
                                        name="firstName"
                                        value={firstName}
                                        placeholder="Enter the first name"
                                        onChange={this.handleInputChange}/>
                                    <div className="invalid-feedback">{firstNameError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Surname:</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={lastNameError ? "form-control is-invalid" : "form-control"}
                                        name="lastName"
                                        value={lastName}
                                        placeholder="Enter the last name"
                                        onChange={this.handleInputChange}/>
                                    <div className="invalid-feedback">{lastNameError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">City:</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={cityError ? "form-control is-invalid" : "form-control"}
                                        name="city"
                                        value={city}
                                        placeholder="Enter the city"
                                        onChange={this.handleInputChange}/>
                                    <div className="invalid-feedback">{cityError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Address:</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={addressError ? "form-control is-invalid" : "form-control"}
                                        name="address"
                                        value={address}
                                        placeholder="Enter the address"
                                        onChange={this.handleInputChange}/>
                                    <div className="invalid-feedback">{addressError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Index:</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={postIndexError ? "form-control is-invalid" : "form-control"}
                                        name="postIndex"
                                        value={postIndex}
                                        placeholder="Enter the index"
                                        onChange={this.handleInputChange}/>
                                    <div className="invalid-feedback">{postIndexError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Mobile:</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={phoneNumberError ? "form-control is-invalid" : "form-control"}
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        placeholder="(___)-___-____"
                                        onChange={this.handleInputChange}/>
                                    <div className="invalid-feedback">{phoneNumberError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Email:</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={emailError || validateEmailError ? "form-control is-invalid" : "form-control"}
                                        name="email"
                                        value={email}
                                        placeholder="example@gmail.com"
                                        onChange={this.handleInputChange}/>
                                    <div className="invalid-feedback">{emailError || validateEmailError}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="container-fluid">
                                <div className="row">
                                    {perfumes.map((perfume) => {
                                        return (
                                            <div key={perfume.id} className="col-lg-6 d-flex align-items-stretch">
                                                <div className="card mb-5">
                                                    <img src={IMG_URL + `${perfume.filename}`}
                                                         className="rounded mx-auto w-50"/>
                                                    <div className="card-body text-center">
                                                        <h5>{perfume.perfumeTitle}</h5>
                                                        <h6>{perfume.perfumer}</h6>
                                                        <h6><span>Price: $ {perfume.price}</span>.00</h6>
                                                        <h6><span>Quantity: {perfumesFromLocalStorage.get(perfume.id)}</span></h6>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-success px-5 float-right">
                                <FontAwesomeIcon icon={faCheckCircle}/> Validate order
                            </button>
                            <div className="row">
                                <h4>To pay : $ <span>{totalPrice}</span>.00</h4>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

Order.propTypes = {
    addOrder: PropTypes.func.isRequired,
    perfumes: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired,
    totalPrice: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
    perfumes: state.cart.perfumes,
    totalPrice: state.cart.totalPrice,
    errors: state.order.errors
});

export default connect(mapStateToProps, {addOrder, fetchOrder})(Order);
