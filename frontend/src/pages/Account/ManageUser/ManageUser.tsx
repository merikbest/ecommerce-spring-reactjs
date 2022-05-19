import React, {FC, ReactElement, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons";

import {fetchUserInfo, fetchUserOrders} from "../../../redux/admin/admin-thunks";
import Spinner from '../../../component/Spinner/Spinner';
import AccountDataItem from "../../../component/AccountDataItem/AccountDataItem";
import InfoTitle from "../../../component/InfoTitle/InfoTitle";
import {
    selectAdminStateUerOrders,
    selectAdminStateUser,
    selectIsAdminStateLoaded
} from "../../../redux/admin/admin-selector";

const ManageUser: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const userData = useSelector(selectAdminStateUser);
    const userOrders = useSelector(selectAdminStateUerOrders);
    const loading = useSelector(selectIsAdminStateLoaded);
    const {id, email, firstName, lastName, city, address, phoneNumber, postIndex, provider, roles} = userData;

    useEffect(() => {
        dispatch(fetchUserInfo(params.id));
    }, []);

    useEffect(() => {
        dispatch(fetchUserOrders(email));
    }, [userData]);

    return (
        <div className="container">
            {loading ? (
                <Spinner/>
            ) : (
                <>
                    <InfoTitle iconClass={"mr-2"} icon={faUserEdit} title={`User: ${firstName} ${lastName}`}/>
                    <div className="row mt-5 mb-4 border px-3 py-3">
                        <div className="col-md-4">
                            <AccountDataItem title={"User id"} text={id}/>
                            <AccountDataItem title={"Email"} text={email}/>
                            <AccountDataItem title={"Role"} text={roles}/>
                        </div>
                        <div className="col-md-4">
                            <AccountDataItem title={"First name"} text={firstName}/>
                            <AccountDataItem title={"Last name"} text={lastName}/>
                            <AccountDataItem title={"Provider"} text={provider}/>
                        </div>
                        <div className="col-md-4">
                            <AccountDataItem title={"City"} text={city}/>
                            <AccountDataItem title={"Address"} text={address}/>
                            <AccountDataItem title={"Phone number"} text={phoneNumber}/>
                            <AccountDataItem title={"Post index"} text={postIndex}/>
                        </div>
                    </div>
                    {(userOrders.length === 0) ? (
                        <h5 style={{textAlign: "center"}}>
                            No orders
                        </h5>
                    ) : (
                        <>
                            <h5 style={{textAlign: "center"}}>
                                Orders
                            </h5>
                            <table className="table border text-center">
                                <thead className="table-active">
                                <tr>
                                    <th>Order №</th>
                                    <th>Date</th>
                                    <th>City</th>
                                    <th>Address</th>
                                    <th>Post index</th>
                                    <th>Order Summary</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {userOrders.map((order) => {
                                    return (
                                        <tr key={order.id}>
                                            <th>{order.id}</th>
                                            <th>{order.date}</th>
                                            <th>{order.city}</th>
                                            <th>{order.address}</th>
                                            <th>{order.postIndex}</th>
                                            <th>{order.totalPrice}.0 $</th>
                                            <th>
                                                <Link to={{
                                                    pathname: `/account/user/orders/${order.id}`,
                                                    state: order
                                                }}>
                                                    Show more
                                                </Link>
                                            </th>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ManageUser;
