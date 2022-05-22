import React, { FC, ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

import AccountDataItem from "../../../component/AccountDataItem/AccountDataItem";
import InfoTitle from "../../../component/InfoTitle/InfoTitle";
import { fetchOrderById, fetchOrderItemsByOrderId } from "../../../redux/order/order-thunks";
import { resetOrderState } from "../../../redux/order/order-actions";
import {
    selectIsOrderLoaded,
    selectIsOrderLoading,
    selectOrder,
    selectOrderItems
} from "../../../redux/order/order-selector";
import Spinner from "../../../component/Spinner/Spinner";
import "./ManageUserOrder.css";
import ManageUserOrderTable from "./ManageUserOrderTable/ManageUserOrderTable";

const ManageUserOrder: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const order = useSelector(selectOrder);
    const orderItems = useSelector(selectOrderItems);
    const isOrderLoading = useSelector(selectIsOrderLoading);
    const isOrderLoaded = useSelector(selectIsOrderLoaded);
    const { id, email, firstName, lastName, totalPrice, postIndex, phoneNumber, date, city, address } = order;

    useEffect(() => {
        dispatch(fetchOrderById(params.id));

        return () => {
            dispatch(resetOrderState());
        };
    }, []);

    useEffect(() => {
        if (isOrderLoaded) {
            dispatch(fetchOrderItemsByOrderId(params.id));
        }
    }, [isOrderLoaded]);

    return (
        <>
            {isOrderLoading ? (
                <Spinner />
            ) : (
                <>
                    <InfoTitle icon={faShoppingBag} titleClass={"manage_user_order_title"} title={` Order #${id}`} />
                    <div className="row border my-5 px-5 py-3">
                        <div className="col-md-6">
                            <h5 className={"manage_user_order_subtitle"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> Customer information
                            </h5>
                            <AccountDataItem title={"First name"} text={firstName} />
                            <AccountDataItem title={"Last name"} text={lastName} />
                            <AccountDataItem title={"City"} text={city} />
                            <AccountDataItem title={"Address"} text={address} />
                            <AccountDataItem title={"Email"} text={email} />
                            <AccountDataItem title={"Phone number"} text={phoneNumber} />
                            <AccountDataItem title={"Post index"} text={postIndex} />
                        </div>
                        <div className="col-md-6">
                            <h5 className={"manage_user_order_subtitle"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> Order information
                            </h5>
                            <AccountDataItem title={"Order id"} text={id} />
                            <AccountDataItem title={"Date"} text={date} />
                            <h4 className={"manage_user_order_summary"}>
                                Order summary:{" "}
                                <span className={"manage_user_order_summary_price"}> {totalPrice}.0 $</span>
                            </h4>
                        </div>
                    </div>
                    <ManageUserOrderTable orderItems={orderItems} />
                </>
            )}
        </>
    );
};

export default ManageUserOrder;
