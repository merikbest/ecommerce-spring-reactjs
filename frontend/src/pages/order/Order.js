import React, {useEffect, useState} from 'react';
import ShopService from "../../services/ShopService";
import {IMG_URL} from "../../constants/url";

function Order(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [postIndex, setPostIndex] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [perfumeList, setPerfumeList] = useState([]);
    const [errors, setErrors] = useState({});
    const {firstNameError, lastNameError, cityError, addressError, postIndexError, phoneNumberError, emailError} = errors;
    let totalPrice = 0;
    perfumeList.map(perfume => totalPrice = totalPrice + perfume.price)

    useEffect(() => {
        ShopService.getOrder()
            .then((response) => {
                setPerfumeList(response.data)
            })
    }, [])

    const onFormSubmit = (event) => {
        event.preventDefault();

        const validOrder = {firstName, lastName, city, address, postIndex, phoneNumber, email, perfumeList, totalPrice}

        ShopService.postOrder(validOrder)
            .then((response) => {
                props.history.push("/order/finalize")
            })
            .catch((errors) => {
                setErrors(errors.response.data)
            })
    }

    return (
        <div className="container mt-5 pb-5">
            <p className="h4 mb-4 text-center">Оформление заказа</p>
            <br/>
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Имя:</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className={firstNameError ? "form-control is-invalid" : "form-control"}
                                name="perfumeTitle"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                            <div className="invalid-feedback">{firstNameError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Фамилия:</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className={lastNameError ? "form-control is-invalid" : "form-control"}
                                name="perfumeTitle"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                            <div className="invalid-feedback">{lastNameError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Город:</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className={cityError ? "form-control is-invalid" : "form-control"}
                                name="perfumeTitle"
                                value={city}
                                onChange={(event) => setCity(event.target.value)}
                            />
                            <div className="invalid-feedback">{cityError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Адрес:</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className={addressError ? "form-control is-invalid" : "form-control"}
                                name="perfumeTitle"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            />
                            <div className="invalid-feedback">{addressError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Индекс:</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className={postIndexError ? "form-control is-invalid" : "form-control"}
                                name="perfumeTitle"
                                value={postIndex}
                                onChange={(event) => setPostIndex(event.target.value)}
                            />
                            <div className="invalid-feedback">{postIndexError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Телефон:</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className={phoneNumberError ? "form-control is-invalid" : "form-control"}
                                name="perfumeTitle"
                                value={phoneNumber}
                                onChange={(event) => setPhoneNumber(event.target.value)}
                            />
                            <div className="invalid-feedback">{phoneNumberError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email:</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className={emailError ? "form-control is-invalid" : "form-control"}
                                name="perfumeTitle"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <div className="invalid-feedback">{emailError}</div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="container-fluid">
                        <div className="row">

                            {perfumeList.map((perfume) => {
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
                            onClick={onFormSubmit}>Подтвердить заказ
                    </button>
                    <div className="row">
                        <h4>К оплате : <span>{totalPrice}</span> грн.</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;