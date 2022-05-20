import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    faChevronDown,
    faChevronUp,
    faMinusSquare,
    faShoppingBag,
    faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import Spinner from "../../component/Spinner/Spinner";
import {fetchCart} from "../../redux/cart/cart-thunks";
import {Perfume} from "../../types/types";
import {selectIsCartLoading, selectTotalPrice} from "../../redux/cart/cart-selector";
import {calculateCartPrice, resetCartState, setCartItemsCount} from "../../redux/cart/cart-actions";
import {selectPerfumes} from "../../redux/perfumes/perfumes-selector";
import {removePerfumeById} from "../../redux/perfumes/perfumes-actions";
import "./Cart.css";

const Cart: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const perfumes = useSelector(selectPerfumes);
    const totalPrice = useSelector(selectTotalPrice);
    const loading = useSelector(selectIsCartLoading);
    const [perfumeInCart, setPerfumeInCart] = useState(() => new Map());

    useEffect(() => {
        const perfumesFromLocalStorage: Map<number, number> = new Map(JSON.parse(localStorage.getItem("perfumes") as string));

        dispatch(fetchCart(Array.from(perfumesFromLocalStorage.keys())));
        perfumesFromLocalStorage.forEach((value: number, key: number) => {
            setPerfumeInCart(perfumeInCart.set(key, value))
        });
        
        return () => {
            dispatch(resetCartState());
        };
    }, []);

    const deleteFromCart = (perfumeId: number): void => {
        perfumeInCart.delete(perfumeId);

        if (perfumeInCart.size === 0) {
            localStorage.removeItem("perfumes");
            setPerfumeInCart(new Map());
        } else {
            localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
        }
        dispatch(removePerfumeById(perfumeId));
        dispatch(calculateCartPrice(perfumes));
        dispatch(setCartItemsCount(perfumeInCart.size));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, perfumeId: number): void => {
        if (isNaN(parseInt(event.target.value)) || parseInt(event.target.value) === 0 || parseInt(event.target.value) > 99) {
            setPerfumes(perfumeId, 1);
        } else {
            setPerfumes(perfumeId, parseInt(event.target.value));
        }
        dispatch(calculateCartPrice(perfumes));
    };

    const onChangePerfumeItemCount = (perfumeId: number, perfumeCondition: boolean): void => {
        const perfume = perfumeInCart.get(perfumeId);
        setPerfumes(perfumeId, perfumeCondition ? (perfume + 1) : (perfume - 1));
        dispatch(calculateCartPrice(perfumes));
    };

    const setPerfumes = (perfumeId: number, perfumeCount: number): void => {
        setPerfumeInCart(perfumeInCart.set(perfumeId, perfumeCount));
        localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
    };

    return (
        <div className="container mt-5 pb-5 cart_wrapper">
            {loading ? (
                <Spinner/>
            ) : (
                <div>
                    {(perfumes.length === 0) ? (
                        <h2 className="text-center">
                            Cart is empty
                        </h2>
                    ) : (
                        <div>
                            <p className="h4 mb-4 text-center">
                                <FontAwesomeIcon className="mr-2" icon={faShoppingCart}/> Cart
                            </p>
                            {perfumes.map((perfume: Perfume) => (
                                <div key={perfume.id} className="card mb-3 mx-auto perfume_item_wrapper">
                                    <div className="row no-gutters">
                                        <div className="col-2 mx-3 my-3">
                                            <img src={perfume.filename} className="img-fluid"/>
                                        </div>
                                        <div className="col-6">
                                            <div className="card-body">
                                                <h4 className="card-title">
                                                    {perfume.perfumer + " " + perfume.perfumeTitle}
                                                </h4>
                                                <p className="card-text">
                                                    {perfume.type}
                                                </p>
                                                <p className="card-text">
                                                    <span>{perfume.volume}</span> ml.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-1 mt-3">
                                            <button 
                                                className="btn btn-default"
                                                disabled={perfumeInCart.get(perfume.id) === 99}
                                                onClick={() => onChangePerfumeItemCount(perfume.id, true)}
                                            >
                                                <FontAwesomeIcon size="lg" icon={faChevronUp}/>
                                            </button>
                                            <input 
                                                type="text"
                                                className="form-control input-number perfume_input_count"
                                                value={perfumeInCart.get(perfume.id)}
                                                onChange={(event) => handleInputChange(event, perfume.id)}
                                            />
                                            <button 
                                                className="btn btn-default"
                                                disabled={perfumeInCart.get(perfume.id) === 1}
                                                onClick={() => onChangePerfumeItemCount(perfume.id, false)}
                                            >
                                                <FontAwesomeIcon size="lg" icon={faChevronDown}/>
                                            </button>
                                        </div>
                                        <div className="col-2">
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    <span>$ {perfume.price * perfumeInCart.get(perfume.id)}</span>
                                                </h5>
                                                <button 
                                                    className="btn btn-warning mb-2"
                                                    onClick={() => deleteFromCart(perfume.id)}
                                                >
                                                    <FontAwesomeIcon className="mr-2" icon={faMinusSquare}/> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <hr className="my-3"/>
                            <div className="row">
                                <div className="col-9">
                                    <p className="h5 text-right">
                                        Total: $ <span>{totalPrice}</span>
                                    </p>
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
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;
