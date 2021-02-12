import React, {useEffect, useState} from "react";
import {Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Checkbox from "../../component/CheckBox/Checkbox";
import CheckboxRadio from "../../component/CheckboxRadio/CheckboxRadio";
import MenuCards from "../../component/MenuCards/MenuCards";
import {gender, perfumer, price} from "./MenuData";
import {
    fetchPerfumes,
    fetchPerfumesByFilterParams,
    fetchPerfumesByGender,
    fetchPerfumesByPerfumer
} from "../../actions/perfume-actions";
import "./MenuStyle.css";

const Menu = (props) => {
    const dispatch = useDispatch();
    const perfumes = useSelector(state => state.perfume.perfumes);
    const [filterParams, setFilterParams] = useState({
        perfumers: [],
        genders: [],
        prices: []
    });

    useEffect(() => {
        const perfumeData = props.location.state.id;

        if (perfumeData === "female" || perfumeData === "male") {
            dispatch(fetchPerfumesByGender({perfumeGender: perfumeData}));
            window.scrollTo(0, 0);
        } else if (perfumeData === "all") {
            dispatch(fetchPerfumes());
            window.scrollTo(0, 0);
        } else if (perfumeData) {
            dispatch(fetchPerfumesByPerfumer({perfumer: perfumeData}));
            window.scrollTo(0, 0);
        }
    }, []);

    const getProducts = (variables) => {
        dispatch(fetchPerfumesByFilterParams(variables));
    };

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key].id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array;
    };

    const handleFilters = (filters, category) => {
        const newFilters = filterParams;
        newFilters[category] = filters;

        if (category === "prices") {
            let priceValues = handlePrice(filters);
            newFilters[category] = priceValues;
        }
        getProducts(newFilters)
        setFilterParams(newFilters);
    };

    return (
        <div className="container d-flex">
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Perfumes</h3>
                </div>
                <ul className="list-unstyled components">
                    <h5>Brand</h5>
                    <li className="active mb-2" id="homeSubmenu">
                        <Checkbox list={perfumer}
                                  handleFilters={(filters) => handleFilters(filters, "perfumers")}/>
                    </li>
                    <h5>Gender</h5>
                    <li className="active mb-2">
                        <Checkbox list={gender}
                                  handleFilters={(filters) => handleFilters(filters, "genders")}/>
                    </li>
                    <h5>Price</h5>
                    <li className="active mb-2">
                        <CheckboxRadio list={price}
                                       handleFilters={(filters) => handleFilters(filters, "prices")}/>
                    </li>
                </ul>
            </nav>
            <Route exact component={() => <MenuCards data={perfumes} itemsPerPage={16} searchByData={[
                {label: 'Brand', value: 'perfumer'},
                {label: 'Perfume title', value: 'perfumeTitle'},
                {label: 'Manufacturer country', value: 'country'}]}/>}/>
        </div>
    );
};

export default Menu;
