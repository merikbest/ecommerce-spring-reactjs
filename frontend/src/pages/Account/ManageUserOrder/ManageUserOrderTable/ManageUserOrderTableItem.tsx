import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

import { PRODUCT } from "../../../../constants/routeConstants";
import { OrderItem } from "../../../../types/types";

type PropsType = {
    orderItem: OrderItem;
};

const ManageUserOrderTableItem: FC<PropsType> = ({ orderItem }): ReactElement => {
    return (
        <tr>
            <th>
                <Link to={`${PRODUCT}/${orderItem.perfume.id}`}>{orderItem.perfume.id}</Link>
            </th>
            <th>{orderItem.perfume.perfumer}</th>
            <th>{orderItem.perfume.perfumeTitle}</th>
            <th>{orderItem.quantity}</th>
            <th>{orderItem.perfume.price}.0 $</th>
            <th>{orderItem.amount}.0 $</th>
        </tr>
    );
};

export default ManageUserOrderTableItem;
