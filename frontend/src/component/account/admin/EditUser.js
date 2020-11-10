import React, {useEffect, useState} from 'react';
import ShopService from "../../../services/ShopService";
import AccountNavbar from "../../parts/account-navbar/AccountNavbar";

function EditUser(props) {
    const [userId, setUserId] = useState(props.match.params.id);
    const [user, setUser] = useState({});
    const [username, setUsername] = useState("");
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        ShopService.getUser(userId)
            .then((response) => {
                setUser(response.data)
            });
    }, []);

    const onFormSubmit = (event) => {
        event.preventDefault();

    }

    return (
        <div>
            <AccountNavbar/>
            <div className="container mt-5">

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Имя пользователя: </label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={user.username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Роль: </label>
                    <div className="col-sm-6">
                        <div className="form-check form-check-inline">
                            <label className="form-check-label mr-1" htmlFor="inlineRadio1">USER</label>
                            <input
                                id="inlineRadio1"
                                type="radio"
                                className="form-check-input"
                                name="roles"
                                value={user.roles}
                                onChange={(event) => setUserRole(event.target.value)}
                            />
                        </div>
                        <div className="form-check form-check-inline">
                            <label className="form-check-label mr-1" htmlFor="inlineRadio2">ADMIN</label>
                            <input
                                id="inlineRadio1"
                                type="radio"
                                className="form-check-input"
                                name="roles"
                                value={user.roles}
                                onChange={(event) => setUserRole(event.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <button className="btn btn-dark" onClick={onFormSubmit}>Сохранить</button>
            </div>
        </div>
    );
}

export default EditUser;