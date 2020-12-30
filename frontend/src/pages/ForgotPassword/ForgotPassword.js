import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey, faPaperPlane} from "@fortawesome/free-solid-svg-icons";

import {forgotPassword, formReset} from "../../actions/auth-actions";
import {validateEmail} from "../../utils/input-validators";

class ForgotPassword extends Component {
    state = {
        email: "",
        validateEmailError: ""
    };

    componentDidMount() {
        this.props.formReset();
    }

    onClickSend = (event) => {
        event.preventDefault();

        const validateEmailError = validateEmail(this.state.email);

        if (validateEmailError) {
            this.setState({
                validateEmailError
            });
        } else {
            const data = {email: this.state.email};

            this.props.forgotPassword(data);
        }
    };

    handleInputChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {email, validateEmailError} = this.state;
        const {error, success} = this.props;

        return (
            <div id="container" className="container mt-5">
                <h4><FontAwesomeIcon className="mr-3" icon={faKey}/>FORGOT PASSWORD?</h4>
                <hr align="left" width="550"/>
                <p>Enter your email address that you used to create your account.</p>
                {error ? <div className="alert alert-danger col-6" role="alert">{error}</div> : null}
                {success ? <div className="alert alert-success col-6" role="alert">{success}</div> : null}
                <form onSubmit={this.onClickSend}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">E-mail: </label>
                        <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faEnvelope}/>
                        <div className="col-sm-4">
                            <input
                                type="email"
                                name="email"
                                value={email}
                                className={validateEmailError ? "form-control is-invalid" : "form-control"}
                                onChange={this.handleInputChange}/>
                            <div className="invalid-feedback">{validateEmailError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <button type="submit" className="btn btn-dark mx-3">
                            <FontAwesomeIcon className="mr-3" icon={faPaperPlane}/>Send
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

ForgotPassword.propTypes = {
    forgotPassword: PropTypes.func.isRequired,
    formReset: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    error: state.auth.error,
    success: state.auth.success
});

export default connect(mapStateToProps, {forgotPassword, formReset})(ForgotPassword);
