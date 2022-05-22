import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import { fetchAllUsers } from "../../../redux/admin/admin-thunks";
import Spinner from "../../../component/Spinner/Spinner";
import InfoTitle from "../../../component/InfoTitle/InfoTitle";
import { selectAdminStateUsers, selectIsAdminStateLoading } from "../../../redux/admin/admin-selector";
import UsersListItem from "./UsersListItem";

const UsersList: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const users = useSelector(selectAdminStateUsers);
    const isLoading = useSelector(selectIsAdminStateLoading);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    return (
        <div className="container">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <InfoTitle iconClass={"ml-2 mr-2"} icon={faUsers} title={"List of all users"} />
                    <table className="table mt-4 border text-center">
                        <thead className="table-active">
                            <tr>
                                <th>id</th>
                                <th>First name</th>
                                <th>E-mail</th>
                                <th>Role</th>
                                <th>Provider</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <UsersListItem key={user.id} user={user} />
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default UsersList;
