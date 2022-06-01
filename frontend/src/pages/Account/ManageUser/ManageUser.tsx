import React, { FC, ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";

import Spinner from "../../../component/Spinner/Spinner";
import AccountDataItem from "../../../component/AccountDataItem/AccountDataItem";
import InfoTitle from "../../../component/InfoTitle/InfoTitle";
import ManageUserTable from "./ManageUserTable/ManageUserTable";
import { selectAdminStateUser, selectIsAdminStateLoading } from "../../../redux-toolkit/admin/admin-selector";
import { selectOrders } from "../../../redux-toolkit/orders/orders-selector";
import { fetchUserInfo } from "../../../redux-toolkit/admin/admin-thunks";
import { resetOrders } from "../../../redux-toolkit/orders/orders-slice";
import { resetAdminState } from "../../../redux-toolkit/admin/admin-slice";
import { fetchUserOrdersByEmail } from "../../../redux-toolkit/orders/orders-thunks";
import { LoadingStatus } from "../../../types/types";

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
            dispatch(resetAdminState(LoadingStatus.LOADING));
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
