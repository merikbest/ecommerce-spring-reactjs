import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

import { Order } from "../../../../types/types";
import { ACCOUNT_USER_ORDERS } from "../../../../constants/routeConstants";

type PropsType = {
    order: Order;
};

const ManageUserTableItem: FC<PropsType> = ({ order }): ReactElement => {
    return (
        <tr>
            <th>{order.id}</th>
            <th>{order.date}</th>
            <th>{order.city}</th>
            <th>{order.address}</th>
            <th>{order.postIndex}</th>
            <th>{order.totalPrice}.0 $</th>
            <th>
                <Link to={`${ACCOUNT_USER_ORDERS}/${order.id}`}>Show more</Link>
            </th>
        </tr>
    );
};

export default ManageUserTableItem;
