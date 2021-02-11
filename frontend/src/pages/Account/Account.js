import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
import ToastShow from "../../component/Toasts/ToastShow";
import {formReset} from "../../actions/admin-actions";
import {fetchAccount} from "../../actions/auth-actions";

const Account = ({success, formReset, fetchAccount}) => {

    useEffect(() => {
        formReset();
        fetchAccount();
    }, []);

    return (
        <div className="container">
            <AccountNavbar/>
            <div className="container" style={{"display": success ? "block" : "none"}}>
                <ToastShow showToast={success} message={"Perfume successfully edited!"}/>
            </div>
        </div>
    );
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
