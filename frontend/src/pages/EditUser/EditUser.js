import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {faEdit, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
import {fetchUser} from "../../redux/thunks/admin-thunks";

const EditUser = (props) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.admin.user);
    const [user, setUser] = useState({});
    const {username, roles} = user;

    useEffect(() => {
        dispatch(fetchUser(props.match.params.id));
    }, []);

    useEffect(() => {
        setUser(userData);
    }, [userData]);

    const onFormSubmit = (event) => {
        event.preventDefault();
        // TODO add method to AdminRestController
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    };

    return (
        <div>
            <AccountNavbar/>
            <div className="container mt-5">
                <h4><FontAwesomeIcon className="mr-2" icon={faUserEdit}/> User: {username}</h4>
                <form onSubmit={onFormSubmit}>
                    <div className="form-group row mt-5">
                        <label className="col-sm-2 col-form-label">User name: </label>
                        <div className="col-sm-4">
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={username}
                                onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Role: </label>
                        <div className="col-sm-6">
                            <div className="form-check form-check-inline">
                                <label className="form-check-label mr-1" htmlFor="inlineRadio1">USER</label>
                                <input
                                    id="inlineRadio1"
                                    type="radio"
                                    className="form-check-input"
                                    name="roles"
                                    value={roles}
                                    onChange={handleInputChange}/>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label mr-1" htmlFor="inlineRadio2">ADMIN</label>
                                <input
                                    id="inlineRadio1"
                                    type="radio"
                                    className="form-check-input"
                                    name="roles"
                                    value={roles}
                                    onChange={handleInputChange}/>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-dark">
                        <FontAwesomeIcon className="mr-2" icon={faEdit}/>Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
