import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Card, Col, Row, Table } from "antd";

import { selectAdminStateUser, selectIsAdminStateLoading } from "../../../../redux-toolkit/admin/admin-selector";
import { selectOrders } from "../../../../redux-toolkit/orders/orders-selector";
import { fetchUserInfo } from "../../../../redux-toolkit/admin/admin-thunks";
import { resetOrders } from "../../../../redux-toolkit/orders/orders-slice";
import { resetAdminState } from "../../../../redux-toolkit/admin/admin-slice";
import { LoadingStatus, Order } from "../../../../types/types";
import { fetchUserOrdersByEmail } from "../../../../redux-toolkit/orders/orders-thunks";
import Spinner from "../../../../component/Spinner/Spinner";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import AccountDataItem from "../../../components/AccountDataItem/AccountDataItem";
import { ACCOUNT_USER_ORDERS } from "../../../../constants/routeConstants";

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
        <>
            {isUserLoading ? (
                <Spinner />
            ) : (
                <>
                    <ContentTitle title={`User: ${firstName} ${lastName}`} titleLevel={4} icon={<UserOutlined />} />
                    <Row>
                        <Col span={24}>
                            <Card>
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <AccountDataItem title={"User id"} text={id} />
                                        <AccountDataItem title={"Email"} text={email} />
                                        <AccountDataItem title={"Role"} text={roles} />
                                        <AccountDataItem title={"First name"} text={firstName} />
                                        <AccountDataItem title={"Last name"} text={lastName} />
                                    </Col>
                                    <Col span={8}>
                                        <AccountDataItem title={"Provider"} text={provider} />
                                        <AccountDataItem title={"City"} text={city} />
                                        <AccountDataItem title={"Address"} text={address} />
                                        <AccountDataItem title={"Phone number"} text={phoneNumber} />
                                        <AccountDataItem title={"Post index"} text={postIndex} />
                                    </Col>
                                </Row>
                            </Card>
                            <Row style={{ marginTop: 16 }}>
                                <Col span={24}>
                                    {userOrders.length === 0 ? (
                                        <div style={{ textAlign: "center" }}>
                                            <ContentTitle title={"No orders"} titleLevel={4} />
                                        </div>
                                    ) : (
                                        <>
                                            <div style={{ textAlign: "center" }}>
                                                <ContentTitle title={"Orders"} titleLevel={4} />
                                            </div>
                                            <Table
                                                rowKey={"id"}
                                                pagination={false}
                                                dataSource={userOrders}
                                                columns={[
                                                    {
                                                        title: "Order №",
                                                        dataIndex: "id",
                                                        key: "id"
                                                    },
                                                    {
                                                        title: "Date",
                                                        dataIndex: "date",
                                                        key: "date"
                                                    },
                                                    {
                                                        title: "City",
                                                        dataIndex: "city",
                                                        key: "city"
                                                    },
                                                    {
                                                        title: "Address",
                                                        dataIndex: "address",
                                                        key: "address"
                                                    },
                                                    {
                                                        title: "Post index",
                                                        dataIndex: "postIndex",
                                                        key: "postIndex"
                                                    },
                                                    {
                                                        title: "Order Summary",
                                                        dataIndex: "totalPrice",
                                                        key: "totalPrice",
                                                        render: (_, order: Order) => `${order.totalPrice}.0 $`
                                                    },
                                                    {
                                                        title: "Actions",
                                                        dataIndex: "actions",
                                                        key: "actions",
                                                        render: (_, order: Order) => (
                                                            <Link to={`${ACCOUNT_USER_ORDERS}/${order.id}`}>
                                                                Show more
                                                            </Link>
                                                        )
                                                    }
                                                ]}
                                            />
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ManageUser;
