import React, { FC, ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";

import { fetchUserInfo } from "../../../redux/admin/admin-thunks";
import Spinner from "../../../component/Spinner/Spinner";
import AccountDataItem from "../../../component/AccountDataItem/AccountDataItem";
import InfoTitle from "../../../component/InfoTitle/InfoTitle";
import { selectAdminStateUser, selectIsAdminStateLoading } from "../../../redux/admin/admin-selector";
import { fetchUserOrdersByEmail } from "../../../redux/orders/orders-thunks";
import { selectOrders } from "../../../redux/orders/orders-selector";
import { resetOrders } from "../../../redux/orders/orders-actions";
import { resetAdminState } from "../../../redux/admin/admin-actions";
import ManageUserTable from "./ManageUserTable/ManageUserTable";

const ManageUser: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const userData = useSelector(selectAdminStateUser);
    const userOrders = useSelector(selectOrders);
    const isUserLoading = useSelector(selectIsAdminStateLoading);
    const { id, email, firstName, lastName, city, address, phoneNumber, postIndex, provider, roles } = userData;

    useEffect(() => {
        dispatch(fetchUserInfo(params.id));

        return () => {
            dispatch(resetOrders());
            dispatch(resetAdminState());
        };
    }, []);

    useEffect(() => {
        if (userData.email) {
            dispatch(fetchUserOrdersByEmail(userData.email!));
        }
    }, [userData]);

    return (
        <div className="container">
            {isUserLoading ? (
                <Spinner />
            ) : (
                <>
                    <InfoTitle iconClass={"mr-2"} icon={faUserEdit} title={`User: ${firstName} ${lastName}`} />
                    <div className="row mt-5 mb-4 border px-3 py-3">
                        <div className="col-md-4">
                            <AccountDataItem title={"User id"} text={id} />
                            <AccountDataItem title={"Email"} text={email} />
                            <AccountDataItem title={"Role"} text={roles} />
                        </div>
                        <div className="col-md-4">
                            <AccountDataItem title={"First name"} text={firstName} />
                            <AccountDataItem title={"Last name"} text={lastName} />
                            <AccountDataItem title={"Provider"} text={provider} />
                        </div>
                        <div className="col-md-4">
                            <AccountDataItem title={"City"} text={city} />
                            <AccountDataItem title={"Address"} text={address} />
                            <AccountDataItem title={"Phone number"} text={phoneNumber} />
                            <AccountDataItem title={"Post index"} text={postIndex} />
                        </div>
                    </div>
                    {userOrders.length === 0 ? (
                        <h5 className="text-center">No orders</h5>
                    ) : (
                        <ManageUserTable userOrders={userOrders} />
                    )}
                </>
            )}
        </div>
    );
};

export default ManageUser;
