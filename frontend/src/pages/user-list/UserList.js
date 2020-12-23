import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import AccountNavbar from "../../component/account-navbar/AccountNavbar";
import {fetchAllUsers} from "../../actions/admin-actions";

class UserList extends Component {

    componentDidMount() {
        this.props.fetchAllUsers();
    }

    render() {
        const {users} = this.props.admin;

        return (
            <div>
                <AccountNavbar/>
                <div className="container">
                    <div className="mt-5 mb-5">
                        <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faUsers}/> Список пользователей</h4>
                    </div>
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
                                        {/*<Link to={`/admin/user/${user.id}`}>edit</Link>*/}
                                    </th>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

UserList.propTypes = {
    fetchAllUsers: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    admin: state.admin
});

export default connect(mapStateToProps, {fetchAllUsers})(UserList);
