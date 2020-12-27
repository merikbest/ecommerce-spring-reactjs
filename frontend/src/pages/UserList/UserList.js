import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
import {fetchAllUsers} from "../../actions/admin-actions";

class UserList extends Component {

    componentDidMount() {
        this.props.fetchAllUsers();
    }

    render() {
        const {users} = this.props;

        return (
            <div>
                <AccountNavbar/>
                <div className="container mt-5">
                    <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faUsers}/> List of all users</h4>
                    <table className="table mt-4">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Role</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <th>{user.username}</th>
                                    <th>{user.email}</th>

                                        {user.roles.map((role, index) => {
                                            return (
                                                <th key={index}>{role}</th>
                                            )
                                        })}
                                    <th>
                                        <Link to={`/admin/user/${user.id}`}>Edit</Link>
                                    </th>
                                </tr>
                            );
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
    users: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    users: state.admin.users
});

export default connect(mapStateToProps, {fetchAllUsers})(UserList);
