import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {faEdit, faLock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
import {updateUserInfo} from "../../actions/user-actions";

const UserEditProfile = (props) => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");

    const onFormSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUserInfo({password, email: localStorage.getItem("email")}, props.history));
    };

    return (
        <div className="container">
            <AccountNavbar/>
            <div className="container mt-5">
                <h4><FontAwesomeIcon className="mr-2" icon={faLock}/> Change Password</h4>
                {/*<h5 th:text="${username}"></h5>*/}
                <form onSubmit={onFormSubmit}>
                    <div className="form-group row mt-5">
                        <label className="col-form-label mx-3">Enter a new password: </label>
                        <div className="col-sm-4">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-dark">
                        <FontAwesomeIcon className="mr-2" icon={faEdit}/> Edit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserEditProfile;
