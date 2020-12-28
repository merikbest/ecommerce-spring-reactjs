import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faSignInAlt} from "@fortawesome/free-solid-svg-icons";

import {login, formReset, activateAccount} from "../../actions/auth-actions";

class Login extends Component {
    state = {
        email: "",
        password: ""
    };

    componentDidMount() {
        this.props.formReset();

        if (this.props.match.params.code) {
            this.props.activateAccount(this.props.match.params.code);
        }
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
        const {error, success} = this.props;

        if (localStorage.getItem("isLoggedIn")) {
            return <Redirect to="/account"/>
        }

        return (
            <div id="container" className="container mt-5">
                <h4><FontAwesomeIcon className="mr-3" icon={faSignInAlt}/>SIGN IN</h4>
                <hr align="left" width="550"/>
                {error ? <div className="alert alert-danger col-6" role="alert">{error}</div> : null}
                {success ? <div className="alert alert-success col-6" role="alert">{success}</div> : null}
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
                        <button type="submit" className="btn btn-dark mx-3">
                            <FontAwesomeIcon className="mr-3" icon={faSignInAlt}/>Sign in
                        </button>
                        <Link to={"/forgot"} style={{position: "relative", top: "8px"}}>Forgot password?</Link>
                    </div>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    formReset: PropTypes.func.isRequired,
    activateAccount: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    error: state.auth.error,
    success: state.auth.success
});

export default connect(mapStateToProps, {login, formReset, activateAccount})(Login);
