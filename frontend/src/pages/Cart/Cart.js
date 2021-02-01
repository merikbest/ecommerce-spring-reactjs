import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {IMG_URL} from "../../utils/constants/url";
import Spinner from "../../component/Spinner/Spinner";
import {fetchCart, loadCart} from "../../actions/cart-actions";
import {faMinusSquare, faShoppingBag, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Cart extends Component {

    componentDidMount() {
        let perfumes = JSON.parse(localStorage.getItem("perfumes"));

        if (perfumes !== null) {
            this.props.fetchCart(perfumes);
        } else {
            this.props.loadCart();
        }
    }

    deleteFromCart = (perfumeId) => {
        let perfumes = JSON.parse(localStorage.getItem("perfumes"));

        let id = perfumes.findIndex((id) => (id === perfumeId));
        perfumes.splice(id, 1);

        if (perfumes.length === 0) {
            localStorage.removeItem("perfumes");
        } else {
            localStorage.setItem("perfumes", JSON.stringify(perfumes));
        }

        this.props.fetchCart(perfumes);
    };

    render() {
        const {perfumes, loading} = this.props;
        let totalCartPrice = 0;
        perfumes.map(perfume => totalCartPrice = totalCartPrice + perfume.price);

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
                                                <div className="col-3 ml-3 mt-3">
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
                                                <div className="col-2">
                                                    <div className="card-body">
                                                        <h5 className="card-title"><span>$ {perfume.price}</span></h5>
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
                                        <p className="h5 text-right">Total: $ <span>{totalCartPrice}</span></p>
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
    perfumes: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    perfumes: state.cart.perfumes,
    loading: state.cart.loading
});

export default connect(mapStateToProps, {fetchCart, loadCart})(Cart);
