import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

import { ACCOUNT_ADMIN_USERS } from "../../../constants/routeConstants";
import { User } from "../../../types/types";

type PropsType = {
    user: User;
};

const UsersListItem: FC<PropsType> = ({ user }): ReactElement => {
    return (
        <tr>
            <th>{user.id}</th>
            <th>{user.firstName}</th>
            <th>{user.email}</th>
            <th>{user.roles[0]}</th>
            <th>{user.provider}</th>
            <th>
                <Link to={`${ACCOUNT_ADMIN_USERS}/${user.id}`}>Show more</Link>
            </th>
        </tr>
    );
};

export default UsersListItem;
