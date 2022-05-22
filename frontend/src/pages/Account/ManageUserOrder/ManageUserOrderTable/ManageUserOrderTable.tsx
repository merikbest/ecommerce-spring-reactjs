import React, { FC, ReactElement } from "react";

import { OrderItem } from "../../../../types/types";
import ManageUserOrderTableItem from "./ManageUserOrderTableItem";

type PropsType = {
    orderItems: Array<OrderItem>;
};

const ManageUserOrderTable: FC<PropsType> = ({ orderItems }): ReactElement => {
    return (
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
                {orderItems?.map((orderItem) => (
                    <ManageUserOrderTableItem key={orderItem.id} orderItem={orderItem} />
                ))}
            </tbody>
        </table>
    );
};

export default ManageUserOrderTable;
