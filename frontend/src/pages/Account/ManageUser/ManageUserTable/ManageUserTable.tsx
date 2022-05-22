import React, { FC, ReactElement } from "react";

import { Order } from "../../../../types/types";
import ManageUserTableItem from "./ManageUserTableItem";

type PropsType = {
    userOrders: Array<Order>;
};

const ManageUserTable: FC<PropsType> = ({ userOrders }): ReactElement => {
    return (
        <>
            <h5 className="text-center">Orders</h5>
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
                    {userOrders.map((order) => (
                        <ManageUserTableItem key={order.id} order={order} />
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ManageUserTable;
