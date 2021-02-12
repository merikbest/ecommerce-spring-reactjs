import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faSignInAlt} from "@fortawesome/free-solid-svg-icons";

import {activateAccount, formReset, login} from "../../actions/auth-actions";

const Login = (props) => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error);
    const success = useSelector(state => state.auth.success);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        dispatch(formReset());

        if (props.match.params.code) {
            dispatch(activateAccount(props.match.params.code));
        }
    }, []);

    const onClickSignIn = (event) => {
        event.preventDefault();
        dispatch(login({email, password}, props.history));
    };

    return (
        <div id="container" className="container mt-5">
            <h4><FontAwesomeIcon className="mr-3" icon={faSignInAlt}/>SIGN IN</h4>
            <hr align="left" width="550"/>
            {error ? <div className="alert alert-danger col-6" role="alert">{error}</div> : null}
            {success ? <div className="alert alert-success col-6" role="alert">{success}</div> : null}
            <form onSubmit={onClickSignIn}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">E-mail: </label>
                    <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faEnvelope}/>
                    <div className="col-sm-4">
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Password: </label>
                    <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faLock}/>
                    <div className="col-sm-4">
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <button type="submit" className="btn btn-dark mx-3">
                        <FontAwesomeIcon className="mr-3" icon={faSignInAlt}/>Sign in
                    </button>
                    <Link to={"/forgot"} style={{position: "relative", top: "8px"}}>Forgot password?</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
