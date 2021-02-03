import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {IMG_URL} from "../../utils/constants/url";
import Spinner from "../../component/Spinner/Spinner";
import {fetchCart, loadCart, calculateCartPrice} from "../../actions/cart-actions";
import {
    faChevronDown,
    faChevronUp,
    faMinusSquare,
    faShoppingBag,
    faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Cart extends Component {
    state = {
        perfumeInCart: new Map()
    };

    componentDidMount() {
        let perfumes = new Map(JSON.parse(localStorage.getItem("perfumes")));

        if (perfumes !== null) {
            this.props.fetchCart(Array.from(perfumes.keys()));

            perfumes.forEach((value, key) => {
                this.setState({
                    perfumeInCart: this.state.perfumeInCart.set(key, value)
                });
            });
        } else {
            this.props.loadCart();
        }
    }

    deleteFromCart = (perfumeId) => {
        const {perfumeInCart} = this.state;

        perfumeInCart.delete(perfumeId);

        if (perfumeInCart.size === 0) {
            localStorage.removeItem("perfumes");
            this.setState({
                perfumeInCart: new Map()
            });
        } else {
            localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
        }
        this.props.fetchCart(Array.from(perfumeInCart.keys()));
    };

    handleInputChange = (event) => {
        const {perfumeInCart} = this.state;

        if (isNaN(parseInt(event.target.value))) {
            this.setState({
                perfumeInCart: perfumeInCart.set(parseInt(event.target.id), 1)
            });
            localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
        } else {
            this.setState({
                perfumeInCart: perfumeInCart.set(parseInt(event.target.id), parseInt(event.target.value))
            });
            localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
        }
        this.props.calculateCartPrice(this.props.perfumes);
    };

    onIncrease = (perfumeId) => {
        const {perfumeInCart} = this.state;

        this.setState({
            perfumeInCart: perfumeInCart.set(perfumeId, perfumeInCart.get(perfumeId) + 1)
        });
        localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
        this.props.calculateCartPrice(this.props.perfumes);
    };

    onDecrease = (perfumeId) => {
        const {perfumeInCart} = this.state;

        this.setState({
            perfumeInCart: perfumeInCart.set(perfumeId, perfumeInCart.get(perfumeId) - 1)
        });
        localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
        this.props.calculateCartPrice(this.props.perfumes);
    };

    render() {
        const {perfumes, loading, totalPrice} = this.props;
        const {perfumeInCart} = this.state;

        return (
            <div className="container mt-5 pb-5">
                {loading ? <Spinner/> :
                    <div>
                        {perfumes.length === 0 ?
                            <div style={{textAlign: "center"}}>
                                <h2>Cart is empty</h2>
                            </div> :
                            <div>
                                <p className="h4 mb-4 text-center">
                                    <FontAwesomeIcon className="mr-2" icon={faShoppingCart}/> Cart
                                </p>
                                {perfumes.map((perfume) => {
                                    return (
                                        <div key={perfume.id} className="card mb-3 mx-auto" style={{maxWidth: "940px"}}>
                                            <div className="row no-gutters">
                                                <div className="col-2 ml-3 mt-3">
                                                    <img src={IMG_URL + `${perfume.filename}`}
                                                         className="rounded mx-auto w-50"/>
                                                </div>
                                                <div className="col-6">
                                                    <div className="card-body">
                                                        <h4 className="card-title">{perfume.perfumer + " " + perfume.perfumeTitle}</h4>
                                                        <p className="card-text">{perfume.type}</p>
                                                        <p className="card-text"><span>{perfume.volume}</span> ml.</p>
                                                    </div>
                                                </div>
                                                <div className="col-1 mt-3">
                                                    <button className="btn btn-default"
                                                            onClick={() => this.onIncrease(perfume.id)}>
                                                        <FontAwesomeIcon size="lg" icon={faChevronUp}/>
                                                    </button>
                                                    <input type="text"
                                                           className="form-control input-number"
                                                           style={{width: "45px"}}
                                                           id={perfume.id}
                                                           value={perfumeInCart.get(perfume.id)}
                                                           onChange={this.handleInputChange}/>
                                                    <button className="btn btn-default"
                                                            disabled={perfumeInCart.get(perfume.id) === 1}
                                                            onClick={() => this.onDecrease(perfume.id)}>
                                                        <FontAwesomeIcon size="lg" icon={faChevronDown}/>
                                                    </button>
                                                </div>
                                                <div className="col-2">
                                                    <div className="card-body">
                                                        <h5 className="card-title">
                                                            <span>$ {perfume.price * perfumeInCart.get(perfume.id)}</span>
                                                        </h5>
                                                        <button className="btn btn-warning mb-2"
                                                                onClick={() => this.deleteFromCart(perfume.id)}>
                                                            <FontAwesomeIcon className="mr-2"
                                                                             icon={faMinusSquare}/> Remove
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
                                        <p className="h5 text-right">Total: $ <span>{totalPrice}</span></p>
                                    </div>
                                    <div className="col-3">
                                        <div className="form-row">
                                            <Link to={"/order"}>
                                                <button className="btn btn-success">
                                                    <FontAwesomeIcon className="mr-2" icon={faShoppingBag}/> Checkout
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

Cart.propTypes = {
    fetchCart: PropTypes.func.isRequired,
    loadCart: PropTypes.func.isRequired,
    calculateCartPrice: PropTypes.func.isRequired,
    perfumes: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    totalPrice: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
    perfumes: state.cart.perfumes,
    totalPrice: state.cart.totalPrice,
    loading: state.cart.loading
});

export default connect(mapStateToProps, {fetchCart, loadCart, calculateCartPrice})(Cart);
