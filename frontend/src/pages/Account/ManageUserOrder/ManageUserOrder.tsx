import React, {FC} from 'react';
import {Link, useLocation} from "react-router-dom";

import {Order} from "../../../types/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle, faShoppingBag} from "@fortawesome/free-solid-svg-icons";

const ManageUserOrder: FC = () => {
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
            <h4 style={{textAlign: "center"}}><FontAwesomeIcon icon={faShoppingBag}/> Order #{id}</h4>
            <div className="row border my-5 px-5 py-3">
                <div className="col-md-6">
                    <h5 style={{marginBottom: "30px"}}><FontAwesomeIcon icon={faInfoCircle}/> Customer information</h5>
                    <p className="personal_data_item">First name:
                        <span className="personal_data_text">{firstName}</span>
                    </p>
                    <p className="personal_data_item">Last name:
                        <span className="personal_data_text">{lastName}</span>
                    </p>
                    <p className="personal_data_item">City:
                        <span className="personal_data_text">{city}</span>
                    </p>
                    <p className="personal_data_item">Address:
                        <span className="personal_data_text">{address}</span>
                    </p>
                    <p className="personal_data_item">Email:
                        <span className="personal_data_text">{email}</span>
                    </p>
                    <p className="personal_data_item">Phone number:
                        <span className="personal_data_text">{phoneNumber}</span>
                    </p>
                    <p className="personal_data_item">Post index:
                        <span className="personal_data_text">{postIndex}</span>
                    </p>
                </div>
                <div className="col-md-6">
                    <h5 style={{marginBottom: "30px"}}><FontAwesomeIcon icon={faInfoCircle}/> Order information</h5>
                    <p className="personal_data_item">Order id:
                        <span className="personal_data_text">{id}</span>
                    </p>
                    <p className="personal_data_item">Date:
                        <span className="personal_data_text">{date}</span>
                    </p>
                    <h4 style={{marginBottom: "30px", marginTop: "30px"}}>Order summary:
                        <span style={{color: "green"}}> {totalPrice}.0 $</span>
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
                {orderItems.map((orderItem) => {
                    return (
                        <tr key={orderItem.id}>
                            <th><Link
                                to={`/product/${orderItem.perfume.id}`}>{orderItem.perfume.id}</Link></th>
                            <th>{orderItem.perfume.perfumer}</th>
                            <th>{orderItem.perfume.perfumeTitle}</th>
                            <th>{orderItem.quantity}</th>
                            <th>{orderItem.perfume.price}.0 $</th>
                            <th>{orderItem.amount}.0 $</th>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </>
    );
};

export default ManageUserOrder;
