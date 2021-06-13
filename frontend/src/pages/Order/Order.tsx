import React, {FC, FormEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faShoppingBag} from "@fortawesome/free-solid-svg-icons";

import {addOrder, fetchOrder} from "../../redux/thunks/order-thunks";
import {validateEmail} from "../../utils/input-validators";
import PageLoader from "../../component/PageLoader/PageLoader";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {useHistory} from "react-router-dom";
import {OrderError, Perfume, User} from "../../types/types";

const Order: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const usersData: Partial<User> = useSelector((state: AppStateType) => state.user.user);
    const perfumes: Array<Perfume> = useSelector((state: AppStateType) => state.cart.perfumes);
    const totalPrice: number = useSelector((state: AppStateType) => state.cart.totalPrice);
    const errors: Partial<OrderError> = useSelector((state: AppStateType) => state.order.errors);
    const loading: boolean = useSelector((state: AppStateType) => state.order.loading);
    const perfumesFromLocalStorage: Map<number, number> = new Map(JSON.parse(localStorage.getItem("perfumes") as string));

    const [firstName, setFirstName] = useState<string | undefined>(usersData.firstName);
    const [lastName, setLastName] = useState<string | undefined>(usersData.lastName);
    const [city, setCity] = useState<string | undefined>(usersData.city);
    const [address, setAddress] = useState<string | undefined>(usersData.address);
    const [postIndex, setPostIndex] = useState<string | undefined>(usersData.postIndex);
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(usersData.phoneNumber);
    const [email, setEmail] = useState<string | undefined>(usersData.email);
    const [validateEmailError, setValidateEmailError] = useState<string>("");

    const {
        firstNameError,
        lastNameError,
        cityError,
        addressError,
        postIndexError,
        phoneNumberError,
        emailError
    } = errors;

    useEffect(() => {
        dispatch(fetchOrder());
    }, []);

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const perfumesId = Object.fromEntries(new Map(JSON.parse(localStorage.getItem("perfumes") as string)));
        const validateEmailError: string = validateEmail(email);

        if (validateEmailError) {
            setValidateEmailError(validateEmailError);
        } else {
            setValidateEmailError("");
            const order = {firstName, lastName, city, address, postIndex, phoneNumber, email, perfumesId, totalPrice};
            dispatch(addOrder(order, history));
        }
    };

    let pageLoading;
    if (loading) {
        pageLoading = (<PageLoader/>);
    }

    return (
        <div className="container mt-5 pb-5">
            {pageLoading}
            <h4 className="mb-4 text-center">
                <FontAwesomeIcon className="mr-2" icon={faShoppingBag}/> Ordering
            </h4>
            <br/>
            <form onSubmit={onFormSubmit}>
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
                                    onChange={(event) => setFirstName(event.target.value)}/>
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
                                    onChange={(event) => setLastName(event.target.value)}/>
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
                                    onChange={(event) => setCity(event.target.value)}/>
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
                                    onChange={(event) => setAddress(event.target.value)}/>
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
                                    onChange={(event) => setPostIndex(event.target.value)}/>
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
                                    onChange={(event) => setPhoneNumber(event.target.value)}/>
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
                                    onChange={(event) => setEmail(event.target.value)}/>
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
                                                <img src={perfume.filename}
                                                     className="rounded mx-auto w-50"/>
                                                <div className="card-body text-center">
                                                    <h5>{perfume.perfumeTitle}</h5>
                                                    <h6>{perfume.perfumer}</h6>
                                                    <h6><span>Price: $ {perfume.price}</span>.00</h6>
                                                    <h6>
                                                        <span>Quantity: {perfumesFromLocalStorage.get(perfume.id)}</span>
                                                    </h6>
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
};

export default Order;
