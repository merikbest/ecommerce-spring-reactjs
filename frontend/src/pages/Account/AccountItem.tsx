import React from 'react';
import {useSelector} from "react-redux";

import {User} from "../../types/types";
import {AppStateType} from "../../redux/reducers/root-reducer";

const AccountItem = () => {
    const usersData: Partial<User> = useSelector((state: AppStateType) => state.user.user);

    return (
        <h4 style={{display: "flex", justifyContent: "center"}}>
            Hello {usersData.firstName} {usersData.lastName}!
        </h4>
    );
};

export default AccountItem;
