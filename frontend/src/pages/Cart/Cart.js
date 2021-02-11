import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    faChevronDown,
    faChevronUp,
    faMinusSquare,
    faShoppingBag,
    faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {IMG_URL} from "../../utils/constants/url";
import Spinner from "../../component/Spinner/Spinner";
import {fetchCart, loadCart, calculateCartPrice} from "../../actions/cart-actions";

const Cart = ({perfumes, loading, totalPrice, fetchCart, loadCart, calculateCartPrice}) => {
    const [perfumeInCart, setPerfumeInCart] = useState(() => new Map());

    useEffect(() => {
        let perfumes = new Map(JSON.parse(localStorage.getItem("perfumes")));

        if (perfumes !== null) {
            fetchCart(Array.from(perfumes.keys()));
            perfumes.forEach((value, key) => {
                setPerfumeInCart(perfumeInCart.set(key, value))
            });
        } else {
            loadCart();
        }
    }, []);

    const deleteFromCart = (perfumeId) => {
        perfumeInCart.delete(perfumeId);

        if (perfumeInCart.size === 0) {
            localStorage.removeItem("perfumes");
            setPerfumeInCart(new Map());
        } else {
            localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
        }
        fetchCart(Array.from(perfumeInCart.keys()));
    };

    const handleInputChange = (event) => {
        if (isNaN(parseInt(event.target.value)) || parseInt(event.target.value) === 0 || parseInt(event.target.value) > 99) {
            setPerfumeInCart(perfumeInCart.set(parseInt(event.target.id), 1));
            localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
        } else {
            setPerfumeInCart(prev => new Map([...prev, [parseInt(event.target.id), parseInt(event.target.value)]]));
            localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
        }
        calculateCartPrice(perfumes);
    };

    const onIncrease = (perfumeId) => {
        setPerfumeInCart(prev => new Map([...prev, [perfumeId, perfumeInCart.get(perfumeId) + 1]]));
        localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
        calculateCartPrice(perfumes);
    };

    const onDecrease = (perfumeId) => {
        setPerfumeInCart(prev => new Map([...prev, [perfumeId, perfumeInCart.get(perfumeId) - 1]]));
        localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
        calculateCartPrice(perfumes);
    };

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
                                            <div className="col-2 mx-3 my-3">
                                                <img src={IMG_URL + `${perfume.filename}`} className="img-fluid"/>
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
                                                        disabled={perfumeInCart.get(perfume.id) === 99}
                                                        onClick={() => onIncrease(perfume.id)}>
                                                    <FontAwesomeIcon size="lg" icon={faChevronUp}/>
                                                </button>
                                                <input type="text"
                                                       className="form-control input-number"
                                                       style={{width: "45px"}}
                                                       id={perfume.id}
                                                       value={perfumeInCart.get(perfume.id)}
                                                       onChange={handleInputChange}/>
                                                <button className="btn btn-default"
                                                        disabled={perfumeInCart.get(perfume.id) === 1}
                                                        onClick={() => onDecrease(perfume.id)}>
                                                    <FontAwesomeIcon size="lg" icon={faChevronDown}/>
                                                </button>
                                            </div>
                                            <div className="col-2">
                                                <div className="card-body">
                                                    <h5 className="card-title">
                                                        <span>$ {perfume.price * perfumeInCart.get(perfume.id)}</span>
                                                    </h5>
                                                    <button className="btn btn-warning mb-2"
                                                            onClick={() => deleteFromCart(perfume.id)}>
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

const mapDispatchToProps = (dispatch) => ({
    calculateCartPrice: (perfumes) => dispatch(calculateCartPrice(perfumes)),
    fetchCart: (perfumes) => dispatch(fetchCart(perfumes)),
    loadCart: () => dispatch(loadCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
