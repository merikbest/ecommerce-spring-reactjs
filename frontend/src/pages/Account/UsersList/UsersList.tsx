import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

import {fetchAllUsers} from "../../../redux/thunks/admin-thunks";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import {User} from "../../../types/types";
import Spinner from '../../../component/Spinner/Spinner';

const UsersList: FC = () => {
    const dispatch = useDispatch();
    const users: Array<User> = useSelector((state: AppStateType) => state.admin.users);
    const loading: boolean = useSelector((state: AppStateType) => state.admin.isLoaded);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    return (
        <div className="container">
            {loading ? <Spinner/> :
            <>
                <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faUsers}/> Danh sách người dùng</h4>
                <table className="table mt-4 border text-center">
                    <thead className="table-active">
                    <tr>
                        <th>id</th>
                        <th>Tên</th>
                        <th>E-mail</th>
                        <th>Quyền</th>
                        <th>Nhà cung cấp</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <th>{user.id}</th>
                                <th>{user.lastName}</th>
                                <th>{user.email}</th>
                                <th>{user.roles[0]}</th>
                                <th>{user.provider}</th>
                                <th>
                                    <Link to={`/account/admin/users/${user.id}`}>Xem thêm</Link>
                                </th>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </>
            }
        </div>
    );
};

export default UsersList;
