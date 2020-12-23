import React, {Component} from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import Checkbox from "../../component/checkbox/Checkbox";
import RadioCheckbox from "../../component/checkbox-radio/RadioCheckbox";
import MenuCards from "../../component/menu-cards/MenuCards";
import {gender, perfumer, price} from "./MenuData";
import {
    fetchPerfumes,
    fetchPerfumesByPerfumer,
    fetchPerfumesByGender,
    fetchPerfumesByFilterParams
} from "../../actions/perfume-actions";
import "./MenuStyle.css";

class Menu extends Component {
    state = {
        filterParams: {
            perfumers: [],
            genders: [],
            prices: []
        }
    };

    componentDidMount() {
        const perfumeData = this.props.location.state.id;

        if (perfumeData === "женский" || perfumeData === "мужской") {
            this.props.fetchPerfumesByGender({perfumeGender: perfumeData});
            window.scrollTo(0, 0);
        } else if (perfumeData === "all") {
            this.props.fetchPerfumes();
            window.scrollTo(0, 0);
        } else if (perfumeData) {
            this.props.fetchPerfumesByPerfumer({perfumer: perfumeData});
            window.scrollTo(0, 0);
        }
    }

    getProducts = (variables) => {
        this.props.fetchPerfumesByFilterParams(variables);
    };

    handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key].id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }

        return array
    };

    handleFilters = (filters, category) => {
        const newFilters = this.state.filterParams
        newFilters[category] = filters

        if (category === "prices") {
            let priceValues = this.handlePrice(filters)
            newFilters[category] = priceValues
        }

        this.getProducts(newFilters)
        this.setState(newFilters);
    };

    render() {
        const {perfumes} = this.props.perfumes;

        return (
            <div className="container d-flex">
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <h3>Парфюмерия</h3>
                    </div>
                    <ul className="list-unstyled components">
                        <h5>Бренд</h5>
                        <li className="active mb-2" id="homeSubmenu">
                            <Checkbox list={perfumer}
                                      handleFilters={(filters) => this.handleFilters(filters, "perfumers")}/>
                        </li>
                        <h5>Пол</h5>
                        <li className="active mb-2">
                            <Checkbox list={gender}
                                      handleFilters={(filters) => this.handleFilters(filters, "genders")}/>
                        </li>
                        <h5>Цена</h5>
                        <li className="active mb-2">
                            <RadioCheckbox list={price}
                                           handleFilters={(filters) => this.handleFilters(filters, "prices")}/>
                        </li>
                    </ul>
                </nav>
                <Route exact component={() => <MenuCards data={perfumes} itemsPerPage={16} searchByData={[
                    {label: 'Парфюмер', value: 'perfumer'},
                    {label: 'Название парфюма', value: 'perfumeTitle'},
                    {label: 'Страна производитель', value: 'country'}]}/>}/>
            </div>
        );
    }
}

Menu.propTypes = {
    fetchPerfumes: PropTypes.func.isRequired,
    fetchPerfumesByPerfumer: PropTypes.func.isRequired,
    fetchPerfumesByGender: PropTypes.func.isRequired,
    fetchPerfumesByFilterParams: PropTypes.func.isRequired,
    perfumes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    perfumes: state.perfume,
});

export default connect(mapStateToProps, {
    fetchPerfumes,
    fetchPerfumesByPerfumer,
    fetchPerfumesByGender,
    fetchPerfumesByFilterParams
})(Menu);
