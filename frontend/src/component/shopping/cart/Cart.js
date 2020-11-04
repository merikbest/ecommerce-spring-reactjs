import React, {useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";
import ShopService from "../../../services/ShopService";

function Cart(props) {
    const [perfumes, setPerfumes] = useState([]);

    let totalCartPrice = 0;
    perfumes.map(perfume => totalCartPrice = totalCartPrice + perfume.price)

    useEffect(() => {
        ShopService.getCart()
            .then((response) => {
                setPerfumes(response.data)
            });
    }, [])

    const removeFromCart = (perfumeId) => {
        const perfume = perfumes.find((perfume) => perfume.id === perfumeId)

        ShopService.removeFromCart(perfume)
            .then((response) => {
                setPerfumes(response.data)
            });
    }

    if (!localStorage.getItem("isLoggedIn")) {
        return <Redirect to="/rest/login"/>
    }

    return (
        <div className="container mt-5 pb-5">
            <p className="h4 mb-4 text-center">Корзина</p>
            {perfumes.map((perfume) => {
                return (
                    <div className="card mb-3 mx-auto" style={{maxWidth: "940px"}}>
                        <div className="row no-gutters">
                            <div className="col-3 p-2">
                                <img src={`http://localhost:8080/img/${perfume.filename}`}
                                     className="rounded mx-auto w-50"/>
                            </div>
                            <div className="col-7">
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
                                            onClick={() => removeFromCart(perfume.id)}>Удалить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <hr className="my-3"/>

            <div className="row">
                <div className="col-9 ">
                    <p className="h5 text-right">Итого: <span>{totalCartPrice}</span> грн.
                    </p>
                </div>

                <div className="col-3">
                    <form action="/order" method="get" className="ml-3">
                        <div className="form-row">
                            <div className="col-6">
                                <button className="btn btn-success">Оформить заказ</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    );
}

export default Cart;