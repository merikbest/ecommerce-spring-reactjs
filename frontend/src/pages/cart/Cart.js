import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {IMG_URL} from "../../constants/url";
import Spinner from "../../component/spinner/Spinner";
import {fetchCart, removeFromCart} from "../../actions/cart-actions";

class Cart extends Component {
    state = {
        load: false
    }

    componentDidMount() {
        this.props.fetchCart();

        this.setState({
            load: true
        });
    }

    deleteFromCart = (perfumeId) => {
        const perfume = this.props.cart.cartItems.find((perfume) => perfume.id === perfumeId);

        this.props.removeFromCart(perfume);
    };

    render() {
        const {cartItems} = this.props.cart;
        let totalCartPrice = 0;
        cartItems.map(perfume => totalCartPrice = totalCartPrice + perfume.price);

        this.props.setCartItems(cartItems.length);

        if (!localStorage.getItem("isLoggedIn")) {
            return <Redirect to="/login"/>
        }

        return (
            <div className="container mt-5 pb-5">
                {this.state.load ? <div>
                        {cartItems.length === 0 ?
                            <div style={{textAlign: "center"}}>
                                <h2>Корзина пуста</h2>
                            </div> :
                            <div>
                                <p className="h4 mb-4 text-center">Корзина</p>
                                {cartItems.map((perfume) => {
                                    return (
                                        <div className="card mb-3 mx-auto" style={{maxWidth: "940px"}}>
                                            <div className="row no-gutters">
                                                <div className="col-3 ml-3 mt-3">
                                                    <img src={IMG_URL + `${perfume.filename}`}
                                                         className="rounded mx-auto w-50"/>
                                                </div>
                                                <div className="col-6">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{perfume.perfumer + " " + perfume.perfumeTitle}</h5>
                                                        <p className="card-text">{perfume.type}</p>
                                                        <p className="card-text"><span>{perfume.volume}</span> мл.</p>
                                                    </div>
                                                </div>
                                                <div className="col-2">
                                                    <div className="card-body">
                                                        <h5 className="card-title"><span>{perfume.price}</span> грн.</h5>
                                                        <button className="btn btn-warning mb-2"
                                                                onClick={() => this.deleteFromCart(perfume.id)}>Удалить
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <hr className="my-3"/>
                                <div className="row">
                                    <div className="col-9">
                                        <p className="h5 text-right">Итого: <span>{totalCartPrice}</span> грн.
                                        </p>
                                    </div>
                                    <div className="col-3">
                                        <div className="form-row">
                                            <Link to={"/order"}>
                                                <button className="btn btn-success">Оформить заказ</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    : <Spinner/>
                }
            </div>
        );
    }
}

Cart.propTypes = {
    fetchCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    cart: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    cart: state.cart
});

export default connect(mapStateToProps, {fetchCart, removeFromCart})(Cart);
