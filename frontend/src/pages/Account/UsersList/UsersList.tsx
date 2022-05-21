import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { fetchAllUsers } from "../../../redux/admin/admin-thunks";
import Spinner from "../../../component/Spinner/Spinner";
import InfoTitle from "../../../component/InfoTitle/InfoTitle";
import { selectAdminStateUsers, selectIsAdminStateLoaded } from "../../../redux/admin/admin-selector";
import { ACCOUNT_ADMIN_USERS } from "../../../constants/routeConstants";

const UsersList: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const users = useSelector(selectAdminStateUsers);
    const loading = useSelector(selectIsAdminStateLoaded);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    return (
        <div className="container">
            {loading ? (
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
                                <tr key={user.id}>
                                    <th>{user.id}</th>
                                    <th>{user.firstName}</th>
                                    <th>{user.email}</th>
                                    <th>{user.roles[0]}</th>
                                    <th>{user.provider}</th>
                                    <th>
                                        <Link to={`${ACCOUNT_ADMIN_USERS}/${user.id}`}>Show more</Link>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default UsersList;
