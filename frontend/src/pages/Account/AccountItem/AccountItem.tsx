import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";

import Spinner from "../../../component/Spinner/Spinner";
import { selectIsUserLoading, selectUserFromUserState } from "../../../redux/user/user-selector";
import "./AccountItem.css";

const AccountItem: FC = (): ReactElement => {
    const usersData = useSelector(selectUserFromUserState);
    const loading = useSelector(selectIsUserLoading);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <h4 className={"account_item_title"}>
                    Hello {usersData?.firstName} {usersData?.lastName}!
                </h4>
            )}
        </>
    );
};

export default AccountItem;
