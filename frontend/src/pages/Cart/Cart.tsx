import React, {ChangeEvent, FC, useEffect, useState} from 'react';
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
import {calculateCartPrice, fetchCart, loadCart} from "../../redux/thunks/cart-thunks";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {Perfume} from "../../types/types";

const Cart: FC = () => {
    const dispatch = useDispatch();
    const perfumes: Array<Perfume> = useSelector((state: AppStateType) => state.cart.perfumes);
    const totalPrice: number = useSelector((state: AppStateType) => state.cart.totalPrice);
    const loading: boolean = useSelector((state: AppStateType) => state.cart.loading);
    const [perfumeInCart, setPerfumeInCart] = useState(() => new Map());

    useEffect(() => {
        const perfumesFromLocalStorage: Map<number, number> = new Map(JSON.parse(localStorage.getItem("perfumes") as string));

        if (perfumesFromLocalStorage !== null) {
            dispatch(fetchCart(Array.from(perfumesFromLocalStorage.keys())))
            perfumesFromLocalStorage.forEach((value: number, key: number) => {
                setPerfumeInCart(perfumeInCart.set(key, value))
            });
        } else {
            dispatch(loadCart());
        }
    }, []);

    const deleteFromCart = (perfumeId: number): void => {
        perfumeInCart.delete(perfumeId);

        if (perfumeInCart.size === 0) {
            localStorage.removeItem("perfumes");
            setPerfumeInCart(new Map());
        } else {
            localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
        }
        dispatch(fetchCart(Array.from(perfumeInCart.keys())));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, perfumeId: number): void => {
        if (isNaN(parseInt(event.target.value)) || parseInt(event.target.value) === 0 || parseInt(event.target.value) > 99) {
            setPerfumeInCart(perfumeInCart.set(perfumeId, 1));
            localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
        } else {
            setPerfumeInCart(perfumeInCart.set(perfumeId, parseInt(event.target.value)));
            localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
        }
        dispatch(calculateCartPrice(perfumes));
    };

    const onIncrease = (perfumeId: number): void => {
        setPerfumeInCart(perfumeInCart.set(perfumeId, perfumeInCart.get(perfumeId) + 1));
        localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
        dispatch(calculateCartPrice(perfumes));
    };

    const onDecrease = (perfumeId: number): void => {
        setPerfumeInCart(perfumeInCart.set(perfumeId, perfumeInCart.get(perfumeId) - 1));
        localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
        dispatch(calculateCartPrice(perfumes));
    };

    return (
        <div className="container mt-5 pb-5" style={{minHeight: "350px"}}>
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
                            {perfumes.map((perfume: Perfume) => {
                                return (
                                    <div key={perfume.id} className="card mb-3 mx-auto" style={{maxWidth: "940px"}}>
                                        <div className="row no-gutters">
                                            <div className="col-2 mx-3 my-3">
                                                <img src={perfume.filename} className="img-fluid"/>
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
                                                       value={perfumeInCart.get(perfume.id)}
                                                       onChange={(event) => handleInputChange(event, perfume.id)}/>
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
};

export default Cart;
