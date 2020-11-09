import React, {useEffect, useState} from 'react';
import ShopService from "../../../services/ShopService";
import {Link} from "react-router-dom";

function UserList(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        ShopService.getAllUsers()
            .then((response) => {
                setUsers(response.data)
            });
    }, []);

    return (
        <div className="container">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Роль</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => {
                    return (
                        <tr>
                            <th>{user.username}</th>
                            <th>{user.email}</th>
                            <th>
                                {user.roles.map((role) => {
                                    return (
                                        <div>
                                            <p>{role}</p>
                                        </div>
                                    )
                                })}
                            </th>
                            <th>
                                {/*<Link to={`/rest/admin/user/${user.id}`}>edit</Link>*/}
                            </th>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;