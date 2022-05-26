import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Spinner from "../../component/Spinner/Spinner";
import { Perfume } from "../../types/types";
import CartItem from "./CartItem";
import CartCheckout from "./CartCheckout";
import { selectPerfumes } from "../../redux-toolkit/perfumes/perfumes-selector";
import { selectIsCartLoading, selectTotalPrice } from "../../redux-toolkit/cart/cart-selector";
import { fetchCart } from "../../redux-toolkit/cart/cart-thunks";
import { calculateCartPrice, resetCartState, setCartItemsCount } from "../../redux-toolkit/cart/cart-slice";
import { removePerfumeById } from "../../redux-toolkit/perfumes/perfumes-slice";
import "./Cart.css";

const Cart: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const perfumes = useSelector(selectPerfumes);
    const totalPrice = useSelector(selectTotalPrice);
    const isCartLoading = useSelector(selectIsCartLoading);
    const [perfumeInCart, setPerfumeInCart] = useState(() => new Map());

    useEffect(() => {
        const perfumesFromLocalStorage: Map<number, number> = new Map(
            JSON.parse(localStorage.getItem("perfumes") as string)
        );

        dispatch(fetchCart(Array.from(perfumesFromLocalStorage.keys())));
        perfumesFromLocalStorage.forEach((value: number, key: number) => {
            setPerfumeInCart(perfumeInCart.set(key, value));
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
        if (
            isNaN(parseInt(event.target.value)) ||
            parseInt(event.target.value) === 0 ||
            parseInt(event.target.value) > 99
        ) {
            setPerfumes(perfumeId, 1);
        } else {
            setPerfumes(perfumeId, parseInt(event.target.value));
        }
        dispatch(calculateCartPrice(perfumes));
    };

    const onChangePerfumeItemCount = (perfumeId: number, perfumeCondition: boolean): void => {
        const perfume = perfumeInCart.get(perfumeId);
        setPerfumes(perfumeId, perfumeCondition ? perfume + 1 : perfume - 1);
        dispatch(calculateCartPrice(perfumes));
    };

    const setPerfumes = (perfumeId: number, perfumeCount: number): void => {
        setPerfumeInCart(perfumeInCart.set(perfumeId, perfumeCount));
        localStorage.setItem("perfumes", JSON.stringify(Array.from(perfumeInCart.entries())));
    };

    return (
        <div className="container mt-5 pb-5 cart_wrapper">
            {isCartLoading ? (
                <Spinner />
            ) : (
                <div>
                    {perfumes.length === 0 ? (
                        <h2 className="text-center">Cart is empty</h2>
                    ) : (
                        <div>
                            <p className="h4 mb-4 text-center">
                                <FontAwesomeIcon className="mr-2" icon={faShoppingCart} /> Cart
                            </p>
                            {perfumes.map((perfume: Perfume) => (
                                <CartItem
                                    key={perfume.id}
                                    perfume={perfume}
                                    perfumeInCart={perfumeInCart}
                                    onChangePerfumeItemCount={onChangePerfumeItemCount}
                                    handleInputChange={handleInputChange}
                                    deleteFromCart={deleteFromCart}
                                />
                            ))}
                            <hr className="my-3" />
                            <CartCheckout totalPrice={totalPrice} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;
