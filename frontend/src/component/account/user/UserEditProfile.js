import React, {useEffect, useState} from 'react';
import ShopService from "../../../services/ShopService";
import AccountNavbar from "../../parts/account-navbar/AccountNavbar";

function UserEditProfile(props) {
    const [password, setPassword] = useState("");

    useEffect(() => {
        const request = {password: password, email: localStorage.getItem("email")}
        ShopService.updateUserInfo(request)
            .then((response) => {
                props.history.push("/account");
            });
    }, []);

    return (
        <div className="container mt-5">
            <AccountNavbar/>
            <h5>Изменение пароля</h5>

            <div className="form-group row mt-5">
                <label className="col-sm-2 col-form-label">Введите новый пароль: </label>
                <div className="col-sm-4">
                    <input type="password"
                           name="password"
                           className="form-control"
                           value={password}
                           onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
            </div>

            <div>
                <button className="btn btn-dark">Изменить</button>
            </div>
        </div>
    );
}

export default UserEditProfile;