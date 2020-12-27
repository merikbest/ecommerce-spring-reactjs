import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faSignInAlt} from "@fortawesome/free-solid-svg-icons";

import {login, formReset} from "../../actions/auth-actions";

class Login extends Component {
    state = {
        email: "",
        password: ""
    };

    componentDidMount() {
        this.props.formReset();
    }

    onClickSignIn = (event) => {
        event.preventDefault();

        const {email, password} = this.state;
        const data = {email, password};

        this.props.login(data, this.props.history);
    };

    handleInputChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {email, password} = this.state;

        if (localStorage.getItem("isLoggedIn")) {
            return <Redirect to="/account"/>
        }

        return (
            <div id="container" className="container mt-5">
                <h4><FontAwesomeIcon className="mr-3" icon={faSignInAlt}/>SIGN IN</h4>
                <hr align="left" width="550"/>
                {this.props.error ?
                    <div className="alert alert-danger col-6" role="alert">
                        {this.props.error}
                    </div> : null}
                <form onSubmit={this.onClickSignIn}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">E-mail: </label>
                        <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faEnvelope}/>
                        <div className="col-sm-4">
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                value={email}
                                onChange={this.handleInputChange}/>
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
                                onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <button type="submit" className="btn btn-dark mx-3">Sign in</button>
                    </div>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    formReset: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    error: state.auth.error
});

export default connect(mapStateToProps, {login, formReset})(Login);
