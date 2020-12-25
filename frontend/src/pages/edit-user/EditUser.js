import React, {Component} from 'react';

import AccountNavbar from "../../component/account-navbar/AccountNavbar";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {fetchUser} from "../../actions/admin-actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faUserEdit} from "@fortawesome/free-solid-svg-icons";

class EditUser extends Component {
    state = {
        username: "",
        roles: ""
    };

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            ...nextProps.admin.user
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        // TODO add method to AdminRestController
    }

    handleInputChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {username, roles} = this.state;

        return (
            <div>
                <AccountNavbar/>
                <div className="container mt-5">
                    <h4><FontAwesomeIcon className="mr-2" icon={faUserEdit}/> Пользователь: {username}</h4>
                    <form onSubmit={this.onFormSubmit}>
                        <div className="form-group row mt-5">
                            <label className="col-sm-2 col-form-label">Имя пользователя: </label>
                            <div className="col-sm-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={this.handleInputChange}/>
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
                                        value={roles}
                                        onChange={this.handleInputChange}/>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label mr-1" htmlFor="inlineRadio2">ADMIN</label>
                                    <input
                                        id="inlineRadio1"
                                        type="radio"
                                        className="form-check-input"
                                        name="roles"
                                        value={roles}
                                        onChange={this.handleInputChange}/>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-dark">
                            <FontAwesomeIcon className="mr-2" icon={faEdit}/>Сохранить
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

EditUser.propTypes = {
    fetchUser: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    admin: state.admin
});

export default connect(mapStateToProps, {fetchUser})(EditUser);
