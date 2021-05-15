import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {fetchUserInfo, fetchUserOrders} from "../../../redux/thunks/admin-thunks";
import {Link, RouteComponentProps} from "react-router-dom";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import {Order, User} from "../../../types/types";
import Spinner from '../../../component/Spinner/Spinner';

const ManageUser: FC<RouteComponentProps<{ id: string }>> = ({match}) => {
    const dispatch = useDispatch();
    const userData: Partial<User> = useSelector((state: AppStateType) => state.admin.user);
    const userOrders: Array<Order> = useSelector((state: AppStateType) => state.admin.userOrders);
    const loading: boolean = useSelector((state: AppStateType) => state.admin.isLoaded);
    const {id, email, firstName, lastName, city, address, phoneNumber, postIndex, provider, roles} = userData;

    useEffect(() => {
        dispatch(fetchUserInfo(match.params.id));
    }, []);

    useEffect(() => {
        dispatch(fetchUserOrders(email));
    }, [userData]);

    return (
        <>
            <div className="container">
                {loading ? <Spinner/> :
                    <>
                        <h4><FontAwesomeIcon className="mr-2" icon={faUserEdit}/> User: {firstName} {lastName}</h4>
                        <div className="row mt-5 mb-4 border px-3 py-3">
                            <div className="col-md-4">
                                <p className="personal_data_item">User id:
                                    <span className="personal_data_text">{id}</span>
                                </p>
                                <p className="personal_data_item">Email:
                                    <span className="personal_data_text">{email}</span>
                                </p>
                                <p className="personal_data_item">Role:
                                    <span className="personal_data_text">{roles}</span>
                                </p>
                            </div>
                            <div className="col-md-4">
                                <p className="personal_data_item">First name:
                                    <span className="personal_data_text">{firstName}</span>
                                </p>
                                <p className="personal_data_item">Last name:
                                    <span className="personal_data_text">{lastName}</span>
                                </p>
                                <p className="personal_data_item">Provider:
                                    <span className="personal_data_text">{provider}</span>
                                </p>
                            </div>
                            <div className="col-md-4">
                                <p className="personal_data_item">City:
                                    <span className="personal_data_text">{city}</span>
                                </p>
                                <p className="personal_data_item">Address:
                                    <span className="personal_data_text">{address}</span>
                                </p>
                                <p className="personal_data_item">Phone number:
                                    <span className="personal_data_text">{phoneNumber}</span>
                                </p>
                                <p className="personal_data_item">Post index:
                                    <span className="personal_data_text">{postIndex}</span>
                                </p>
                            </div>
                        </div>
                        {userOrders.length === 0 ?
                            <h5 style={{textAlign: "center"}}>No orders</h5> :
                            <>
                                <h5 style={{textAlign: "center"}}>Orders</h5>
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
                            </>}
                    </>
                }
            </div>
        </>
    );
};

export default ManageUser;
