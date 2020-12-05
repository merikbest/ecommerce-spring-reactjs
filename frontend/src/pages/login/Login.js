import React, {useEffect, useState} from 'react';
import ShopService from "../../services/ShopService";
import {Redirect} from "react-router-dom";

function Login(props) {
    const [logged, setLogged] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

    const onClickSignIn = (event) => {
        event.preventDefault();

        const data = {email, password};

        ShopService.login(data)
            .then((response) => {
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userRole", response.data.userRole);
                localStorage.setItem("isLoggedIn", true);

                setLogged(true);
                props.setLoggedIn(true);
                props.setCartItems(response.data.perfumeList.length);
            })
            .catch((error) => {
                setError(error.response.data);
            });
    }

    if (logged) {
        return <Redirect to="/account"/>
    }

    return (
        <div id="container" className="container mt-5">
            <h4>Вход в личный кабинет</h4>
            <hr align="left" width="550"/>
            {error ?
                <div className="alert alert-danger col-6" role="alert">
                    {error}
                </div> : null}
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Электронная почта: </label>
                <div className="col-sm-4">
                    <input className="form-control" type="email" name="email" value={email}
                           onChange={(event) => setEmail(event.target.value)}/>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Пароль: </label>
                <div className="col-sm-4">
                    <input className="form-control" type="password" name="password" value={password}
                           onChange={(event) => setPassword(event.target.value)}/>
                </div>
            </div>

            <div className="form-group row">
                <button className="btn btn-dark mx-3" onClick={onClickSignIn}>Вход</button>
            </div>
        </div>
    );
}

export default Login;