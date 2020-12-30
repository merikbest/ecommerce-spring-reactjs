import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faSync, faUndo} from "@fortawesome/free-solid-svg-icons";

import {resetPassword, fetchResetPasswordCode, formReset} from "../../actions/auth-actions";
import {checkPasswords, validatePassword} from "../../utils/input-validators";

class ResetPassword extends Component {
    state = {
        password: "",
        password2: "",
        validatePasswordError: "",
        validateRepeatPasswordError: ""
    };

    componentDidMount() {
        this.props.formReset();

        if (this.props.match.params.code) {
            this.props.fetchResetPasswordCode(this.props.match.params.code);
        }
    }

    onClickReset = (event) => {
        event.preventDefault();

        const {password, password2} = this.state;
        const validateErrors = {};
        validateErrors.validatePasswordError = validatePassword(password);
        validateErrors.validateRepeatPasswordError = checkPasswords(password, password2);

        if (validateErrors.validatePasswordError || validateErrors.validateRepeatPasswordError) {
            this.setState({
                ...validateErrors
            });
        } else {
            const data = {
                email: this.props.user.email,
                password,
                password2
            };

            this.props.resetPassword(data, this.props.history);
        }
    };

    handleInputChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {password, password2, validatePasswordError, validateRepeatPasswordError} = this.state;
        const {passwordError, password2Error} = this.props.errors;

        return (
            <div className="container mt-5">
                <h4><FontAwesomeIcon className="mr-2" icon={faSync}/> RESET PASSWORD</h4>
                <hr align="left" width="550"/>
                {this.props.error ?
                    <div className="alert alert-danger col-6" role="alert">{this.props.error}</div> : null}
                <form onSubmit={this.onClickReset}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Password: </label>
                        <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faLock}/>
                        <div className="col-sm-4">
                            <input
                                type="password"
                                name="password"
                                value={password}
                                className={passwordError || validatePasswordError ? "form-control is-invalid" : "form-control"}
                                onChange={this.handleInputChange}/>
                            <div className="invalid-feedback">{passwordError || validatePasswordError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Confirm password: </label>
                        <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faLock}/>
                        <div className="col-sm-4">
                            <input
                                type="password"
                                name="password2"
                                value={password2}
                                className={password2Error || validateRepeatPasswordError ? "form-control is-invalid" : "form-control"}
                                onChange={this.handleInputChange}/>
                            <div className="invalid-feedback">{password2Error || validateRepeatPasswordError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <button type="submit" className="btn btn-dark mx-3">
                            <FontAwesomeIcon className="mr-3" icon={faUndo}/>Reset
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

ResetPassword.propTypes = {
    fetchResetPasswordCode: PropTypes.func.isRequired,
    formReset: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    error: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    errors: state.auth.errors,
    error: state.auth.error
});

export default connect(mapStateToProps, {resetPassword, fetchResetPasswordCode, formReset})(ResetPassword);
