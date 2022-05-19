import React, {FC, ReactElement} from 'react';
import {Link, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle, faShoppingBag} from "@fortawesome/free-solid-svg-icons";

import {Order} from "../../../types/types";
import AccountDataItem from "../../../component/AccountDataItem/AccountDataItem";
import InfoTitle from "../../../component/InfoTitle/InfoTitle";
import "./ManageUserOrder.css";

const ManageUserOrder: FC = (): ReactElement => {
    const location = useLocation<Order>();
    const {
        id,
        email,
        firstName,
        lastName,
        totalPrice,
        postIndex,
        phoneNumber,
        date,
        city,
        address,
        orderItems
    } = location.state;

    return (
        <>
            <InfoTitle icon={faShoppingBag} titleClass={"manage_user_order_title"} title={` Order #${id}`}/>
            <div className="row border my-5 px-5 py-3">
                <div className="col-md-6">
                    <h5 className={"manage_user_order_subtitle"}>
                        <FontAwesomeIcon icon={faInfoCircle}/> Customer information
                    </h5>
                    <AccountDataItem title={"First name"} text={firstName}/>
                    <AccountDataItem title={"Last name"} text={lastName}/>
                    <AccountDataItem title={"City"} text={city}/>
                    <AccountDataItem title={"Address"} text={address}/>
                    <AccountDataItem title={"Email"} text={email}/>
                    <AccountDataItem title={"Phone number"} text={phoneNumber}/>
                    <AccountDataItem title={"Post index"} text={postIndex}/>
                </div>
                <div className="col-md-6">
                    <h5 className={"manage_user_order_subtitle"}>
                        <FontAwesomeIcon icon={faInfoCircle}/> Order information
                    </h5>
                    <AccountDataItem title={"Order id"} text={id}/>
                    <AccountDataItem title={"Date"} text={date}/>
                    <h4 className={"manage_user_order_summary"}>
                        Order summary: <span className={"manage_user_order_summary_price"}> {totalPrice}.0 $</span>
                    </h4>
                </div>
            </div>
            <table className="table border text-center">
                <thead className="table-active">
                <tr>
                    <th>Perfume Id</th>
                    <th>Perfume Brand</th>
                    <th>Perfume Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {orderItems.map((orderItem) => (
                    <tr key={orderItem.id}>
                        <th><Link to={`/product/${orderItem.perfume.id}`}>{orderItem.perfume.id}</Link></th>
                        <th>{orderItem.perfume.perfumer}</th>
                        <th>{orderItem.perfume.perfumeTitle}</th>
                        <th>{orderItem.quantity}</th>
                        <th>{orderItem.perfume.price}.0 $</th>
                        <th>{orderItem.amount}.0 $</th>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default ManageUserOrder;
