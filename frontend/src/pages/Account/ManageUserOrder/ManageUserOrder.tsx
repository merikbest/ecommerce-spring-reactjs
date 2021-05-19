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
            <h4 style={{textAlign: "center"}}><FontAwesomeIcon icon={faShoppingBag}/> Đơn hàng #{id}</h4>
            <div className="row border my-5 px-5 py-3">
                <div className="col-md-6">
                    <h5 style={{marginBottom: "30px"}}><FontAwesomeIcon icon={faInfoCircle}/> Thông tin khách hàng</h5>
                    <p className="personal_data_item">Họ đệm:
                        <span className="personal_data_text">{firstName}</span>
                    </p>
                    <p className="personal_data_item">Tên:
                        <span className="personal_data_text">{lastName}</span>
                    </p>
                    <p className="personal_data_item">Thành phố:
                        <span className="personal_data_text">{city}</span>
                    </p>
                    <p className="personal_data_item">Địa chỉ:
                        <span className="personal_data_text">{address}</span>
                    </p>
                    <p className="personal_data_item">Email:
                        <span className="personal_data_text">{email}</span>
                    </p>
                    <p className="personal_data_item">Phone number:
                        <span className="personal_data_text">{phoneNumber}</span>
                    </p>
                    <p className="personal_data_item">Mã bưu điện:
                        <span className="personal_data_text">{postIndex}</span>
                    </p>
                </div>
                <div className="col-md-6">
                    <h5 style={{marginBottom: "30px"}}><FontAwesomeIcon icon={faInfoCircle}/> Thông tin đơn hàng</h5>
                    <p className="personal_data_item">Mã đơn hàng:
                        <span className="personal_data_text">{id}</span>
                    </p>
                    <p className="personal_data_item">Thời gian:
                        <span className="personal_data_text">{date}</span>
                    </p>
                    <h4 style={{marginBottom: "30px", marginTop: "30px"}}>Tổng tiền:
                        <span style={{color: "green"}}> {totalPrice}.0 $</span>
                    </h4>
                </div>
            </div>
            <table className="table border text-center">
                <thead className="table-active">
                <tr>
                    <th>Mã nước hoa</th>
                    <th>Thương hiệu</th>
                    <th>Tên</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Tổng tiền</th>
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
