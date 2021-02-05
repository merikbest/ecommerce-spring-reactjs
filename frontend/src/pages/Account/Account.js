import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
import ToastShow from "../../component/Toasts/ToastShow";
import {formReset} from "../../actions/admin-actions";
import {fetchAccount} from "../../actions/auth-actions";

class Account extends Component {

    componentDidMount() {
        this.props.formReset();
        this.props.fetchAccount();
    }

    render() {
        return (
            <div className="container">
                <AccountNavbar/>
                <div className="container" style={{"display": this.props.success ? "block" : "none"}}>
                    <ToastShow showToast={this.props.success} message={"Perfume successfully edited!"}/>
                </div>
            </div>
        );
    }
}

Account.propTypes = {
    formReset: PropTypes.func.isRequired,
    fetchAccount: PropTypes.func.isRequired,
    success: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    success: state.admin.success
});

const mapDispatchToProps = (dispatch) => {
    return {
        formReset: () => dispatch(formReset()),
        fetchAccount: () => dispatch(fetchAccount()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
