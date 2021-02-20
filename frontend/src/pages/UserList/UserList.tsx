import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
import {fetchAllUsers} from "../../redux/thunks/admin-thunks";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {User} from "../../types/types";

const UserList: FC = () => {
    const dispatch = useDispatch();
    const users: Array<User> = useSelector((state: AppStateType) => state.admin.users);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    return (
        <div>
            <AccountNavbar/>
            <div className="container mt-5">
                <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faUsers}/> List of all users</h4>
                <table className="table mt-4">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Role</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <th>{user.username}</th>
                                <th>{user.email}</th>
                                {user.roles.map((role: string, index: number) => {
                                    return (
                                        <th key={index}>{role}</th>
                                    )
                                })}
                                <th>
                                    <Link to={`/admin/user/${user.id}`}>Edit</Link>
                                </th>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
