import React, { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

import { addOrder } from "../../redux/order/order-thunks";
import { validateEmail } from "../../utils/input-validators";
import InfoTitle from "../../component/InfoTitle/InfoTitle";
import OrderItem from "./OrderItem/OrderItem";
import { resetOrderState, setOrderLoadingState } from "../../redux/order/order-actions";
import { selectIsOrderLoading, selectOrderErrors } from "../../redux/order/order-selector";
import { selectTotalPrice } from "../../redux/cart/cart-selector";
import { selectUserFromUserState } from "../../redux/user/user-selector";
import { selectPerfumes } from "../../redux/perfumes/perfumes-selector";
import { resetPerfumesState } from "../../redux/perfumes/perfumes-actions";
import Input from "../../component/Input/Input";
import { LoadingStatus } from "../../types/types";

const initialState = {
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    phoneNumber: "",
    postIndex: "",
    email: ""
};

const Order: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const usersData = useSelector(selectUserFromUserState);
    const perfumes = useSelector(selectPerfumes);
    const totalPrice = useSelector(selectTotalPrice);
    const errors = useSelector(selectOrderErrors);
    const isOrderLoading = useSelector(selectIsOrderLoading);
    const [user, setUser] = useState(initialState);
    const [validateEmailError, setValidateEmailError] = useState<string>("");

    const perfumesFromLocalStorage: Map<number, number> = new Map(
        JSON.parse(localStorage.getItem("perfumes") as string)
    );
    const { firstName, lastName, city, address, phoneNumber, postIndex, email } = user;

    useEffect(() => {
        dispatch(setOrderLoadingState(LoadingStatus.LOADED));

        if (usersData) {
            setUser(usersData);
        }

        return () => {
            dispatch(resetOrderState());
            dispatch(resetPerfumesState());
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
            const order = { firstName, lastName, city, address, postIndex, phoneNumber, email, perfumesId, totalPrice };
            dispatch(addOrder(order, history));
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <div className="container mt-5 pb-5">
            <InfoTitle iconClass={"mr-2"} icon={faShoppingBag} titleClass={"mb-4 text-center"} title={"Ordering"} />
            <br />
            <form onSubmit={onFormSubmit}>
                <div className="row">
                    <div className="col-lg-6">
                        <Input
                            title={"Name"}
                            titleClass={"col-sm-2"}
                            wrapperClass={"col-sm-8"}
                            type={"text"}
                            error={errors.firstNameError}
                            name={"firstName"}
                            value={firstName}
                            placeholder={"Enter the first name"}
                            disabled={isOrderLoading}
                            onChange={handleInputChange}
                        />
                        <Input
                            title={"Surname"}
                            titleClass={"col-sm-2"}
                            wrapperClass={"col-sm-8"}
                            type={"text"}
                            error={errors.lastNameError}
                            name={"lastName"}
                            value={lastName}
                            placeholder={"Enter the last name"}
                            disabled={isOrderLoading}
                            onChange={handleInputChange}
                        />
                        <Input
                            title={"City"}
                            titleClass={"col-sm-2"}
                            wrapperClass={"col-sm-8"}
                            type={"text"}
                            error={errors.cityError}
                            name={"city"}
                            value={city}
                            placeholder={"Enter the city"}
                            disabled={isOrderLoading}
                            onChange={handleInputChange}
                        />
                        <Input
                            title={"Address"}
                            titleClass={"col-sm-2"}
                            wrapperClass={"col-sm-8"}
                            type={"text"}
                            error={errors.addressError}
                            name={"address"}
                            value={address}
                            placeholder={"Enter the address"}
                            disabled={isOrderLoading}
                            onChange={handleInputChange}
                        />
                        <Input
                            title={"Index"}
                            titleClass={"col-sm-2"}
                            wrapperClass={"col-sm-8"}
                            type={"text"}
                            error={errors.postIndexError}
                            name={"postIndex"}
                            value={postIndex}
                            placeholder={"Enter the index"}
                            disabled={isOrderLoading}
                            onChange={handleInputChange}
                        />
                        <Input
                            title={"Mobile"}
                            titleClass={"col-sm-2"}
                            wrapperClass={"col-sm-8"}
                            type={"text"}
                            error={errors.phoneNumberError}
                            name={"phoneNumber"}
                            value={phoneNumber}
                            placeholder={"(___)-___-____"}
                            disabled={isOrderLoading}
                            onChange={handleInputChange}
                        />
                        <Input
                            title={"Email"}
                            titleClass={"col-sm-2"}
                            wrapperClass={"col-sm-8"}
                            type={"text"}
                            error={errors.emailError || validateEmailError}
                            name={"email"}
                            value={email}
                            placeholder={"example@gmail.com"}
                            disabled={isOrderLoading}
                            onChange={handleInputChange}
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
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg btn-success px-5 float-right"
                            disabled={isOrderLoading}
                        >
                            <FontAwesomeIcon icon={faCheckCircle} /> Validate order
                        </button>
                        <div className="row">
                            <h4>
                                To pay : $ <span>{totalPrice}</span>.00
                            </h4>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Order;
