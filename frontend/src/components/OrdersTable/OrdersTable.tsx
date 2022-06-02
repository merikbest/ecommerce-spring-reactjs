import React, { FC, ReactElement } from "react";
import {Link} from "react-router-dom";
import { Table } from "antd";

import { Order } from "../../types/types";
import {ACCOUNT_USER_ORDERS} from "../../constants/routeConstants";

type PropsType = {
    orders: Array<Order>;
    loading: boolean;
};

const OrdersTable: FC<PropsType> = ({ orders, loading }): ReactElement => {
    return (
        <Table
            rowKey={"id"}
            loading={loading}
            pagination={{ position: ["bottomRight", "topRight"] }}
            dataSource={orders}
            columns={[
                {
                    title: "Order №",
                    dataIndex: "id",
                    key: "id"
                },
                {
                    title: "Date",
                    dataIndex: "date",
                    key: "date",
                    sorter: (a, b) => a.date.localeCompare(b.date)
                },
                {
                    title: "Customer",
                    dataIndex: "firstName",
                    key: "firstName",
                    render: (_, order: Order) => `${order.firstName} ${order.lastName}`
                },
                {
                    title: "Email",
                    dataIndex: "email",
                    key: "email"
                },
                {
                    title: "Sum, $",
                    dataIndex: "totalPrice",
                    key: "totalPrice",
                    sorter: (a, b) => a.totalPrice - b.totalPrice
                },
                {
                    title: "Actions",
                    dataIndex: "operations",
                    key: "operations",
                    render: (_, order: Order) => <Link to={`${ACCOUNT_USER_ORDERS}/${order.id}`}>Show more</Link>
                }
            ]}
        />
    );
};

export default OrdersTable;
