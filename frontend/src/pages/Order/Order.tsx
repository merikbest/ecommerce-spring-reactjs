import React, {FC, FormEvent, ReactElement, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faShoppingBag} from "@fortawesome/free-solid-svg-icons";

import {addOrder} from "../../redux/order/order-thunks";
import {validateEmail} from "../../utils/input-validators";
import PageLoader from "../../component/PageLoader/PageLoader";
import InfoTitle from "../../component/InfoTitle/InfoTitle";
import PasswordInput from "../../component/PasswordInput/PasswordInput";
import OrderItem from "./OrderItem/OrderItem";
import {resetOrderState} from "../../redux/order/order-actions";
import {selectIsOrderLoading, selectOrderErrors} from "../../redux/order/order-selector";
import {selectCartItems, selectTotalPrice} from "../../redux/cart/cart-selector";
import {selectUserFromUserState} from "../../redux/user/user-selector";

const Order: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const usersData = useSelector(selectUserFromUserState);
    const perfumes = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const errors = useSelector(selectOrderErrors);
    const isOrderLoading = useSelector(selectIsOrderLoading);
    const perfumesFromLocalStorage: Map<number, number> = new Map(JSON.parse(localStorage.getItem("perfumes") as string));

    const [firstName, setFirstName] = useState<string | undefined>("");
    const [lastName, setLastName] = useState<string | undefined>("");
    const [city, setCity] = useState<string | undefined>("");
    const [address, setAddress] = useState<string | undefined>("");
    const [postIndex, setPostIndex] = useState<string | undefined>("");
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
    const [email, setEmail] = useState<string | undefined>("");
    const [validateEmailError, setValidateEmailError] = useState<string>("");

    useEffect(() => {
        setFirstName(usersData.firstName);
        setLastName(usersData.lastName);
        setCity(usersData.city);
        setAddress(usersData.address);
        setPostIndex(usersData.postIndex);
        setPhoneNumber(usersData.phoneNumber);
        setEmail(usersData.email);
        
        return () => {
            dispatch(resetOrderState());
        };
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
    if (isOrderLoading) {
        pageLoading = (<PageLoader/>);
    }

    return (
        <div className="container mt-5 pb-5">
            {pageLoading}
            <InfoTitle iconClass={"mr-2"} icon={faShoppingBag} titleClass={"mb-4 text-center"} title={"Ordering"}/>
            <br/>
            <form onSubmit={onFormSubmit}>
                <div className="row">
                    <div className="col-lg-6">
                        <PasswordInput
                            title={"Name"}
                            titleClass={"col-sm-2"}
                            wrapperClass={"col-sm-8"}
                            type={"text"}
                            error={errors.firstNameError}
                            name={"firstName"}
                            value={firstName}
                            placeholder={"Enter the first name"}
                            onChange={setFirstName}
                        />
                        <PasswordInput
                            title={"Surname"}
                            titleClass={"col-sm-2"}
                            wrapperClass={"col-sm-8"}
                            type={"text"}
                            error={errors.lastNameError}
                            name={"lastName"}
                            value={lastName}
                            placeholder={"Enter the last name"}
                            onChange={setLastName}
                        />
                        <PasswordInput
                            title={"City"}
                            titleClass={"col-sm-2"}
                            wrapperClass={"col-sm-8"}
                            type={"text"}
                            error={errors.cityError}
                            name={"city"}
                            value={city}
                            placeholder={"Enter the city"}
                            onChange={setCity}
                        />
                        <PasswordInput
                            title={"Address"}
                            titleClass={"col-sm-2"}
                            wrapperClass={"col-sm-8"}
                            type={"text"}
                            error={errors.addressError}
                            name={"address"}
                            value={address}
                            placeholder={"Enter the address"}
                            onChange={setAddress}
                        />
                        <PasswordInput
                            title={"Index"}
                            titleClass={"col-sm-2"}
                            wrapperClass={"col-sm-8"}
                            type={"text"}
                            error={errors.postIndexError}
                            name={"postIndex"}
                            value={postIndex}
                            placeholder={"Enter the index"}
                            onChange={setPostIndex}
                        />
                        <PasswordInput
                            title={"Mobile"}
                            titleClass={"col-sm-2"}
                            wrapperClass={"col-sm-8"}
                            type={"text"}
                            error={errors.phoneNumberError}
                            name={"phoneNumber"}
                            value={phoneNumber}
                            placeholder={"(___)-___-____"}
                            onChange={setPhoneNumber}
                        />
                        <PasswordInput
                            title={"Email"}
                            titleClass={"col-sm-2"}
                            wrapperClass={"col-sm-8"}
                            type={"text"}
                            error={errors.emailError || validateEmailError}
                            name={"email"}
                            value={email}
                            placeholder={"example@gmail.com"}
                            onChange={setEmail}
                        />
                    </div>
                    <div className="col-lg-6">
                        <div className="container-fluid">
                            <div className="row">
                                {perfumes.map((perfume) => (
                                    <OrderItem 
                                        key={perfume.id} 
                                        perfume={perfume} 
                                        quantity={perfumesFromLocalStorage.get(perfume.id)}
                                    />
                                ))}
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
