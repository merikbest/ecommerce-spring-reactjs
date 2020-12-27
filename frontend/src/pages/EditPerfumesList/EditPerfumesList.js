import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import EditPerfumes from "./EditPerfumes";
import {fetchPerfumes} from "../../actions/perfume-actions";

class EditPerfumesList extends Component {

    componentDidMount() {
        this.props.fetchPerfumes();
    }

    render() {
        const {perfumes} = this.props;
        const itemsPerPage = 24;
        const searchByData = [
            {label: 'Brand', value: 'perfumer'},
            {label: 'Perfume title', value: 'perfumeTitle'},
            {label: 'Manufacturer country', value: 'country'},
            {label: 'Gender', value: 'perfumeGender'}
        ];

        return (
            <EditPerfumes
                data={perfumes}
                itemsPerPage={itemsPerPage}
                searchByData={searchByData}/>
        );
    }
}

EditPerfumesList.propTypes = {
    fetchPerfumes: PropTypes.func.isRequired,
    perfumes: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    perfumes: state.perfume.perfumes
});

export default connect(mapStateToProps, {fetchPerfumes})(EditPerfumesList);
