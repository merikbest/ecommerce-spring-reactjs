import React, {useEffect, useState} from "react";
import {gender, perfumer, price} from "./MenuData";
import {Collapse} from "reactstrap";
import {Route} from "react-router-dom";
import Checkbox from "./sections/Checkbox";
import ShopService from "../../services/ShopService";
import "./MenuStyle.css";
import RadioCheckbox from "./sections/RadioCheckbox";
import MenuCards from "./sections/MenuCards";

function Menu(props) {
    const [isOpen1, setIsOpen1] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const [isOpen3, setIsOpen3] = useState(false)
    const [Products, setProducts] = useState([])
    const [Filters, setFilters] = useState({
        perfumer: [],
        gender: [],
        price: []
    })

    useEffect(() => {
        ShopService.getProducts()
            .then((response) => {
                setProducts(response.data)
            })
    }, [])

    const getProducts = (variables) => {
        ShopService.getProductsByFilterParams(variables)
            .then((response) => {
                setProducts(response.data)
            })
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key].id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }

        return array
    }

    const handleFilters = (filters, category) => {
        const newFilters = {...Filters}
        newFilters[category] = filters

        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }

        getProducts(newFilters)
        setFilters(newFilters)
    }

    return (
        <div className="container">
            <div className="d-flex">
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <h3>Парфюмерия</h3>
                    </div>
                    <ul className="list-unstyled components">

                        <h5>Бренд</h5>
                        <li className="active mb-2" id="homeSubmenu">
                            <Checkbox list={perfumer} handleFilters={(filters) => handleFilters(filters, "perfumer")}/>
                        </li>

                        <h5>Пол</h5>
                        <li className="active mb-2">
                            <Checkbox list={gender} handleFilters={(filters) => handleFilters(filters, "gender")}/>
                        </li>

                        <h5>Цена</h5>
                        <li className="active mb-2">
                            <RadioCheckbox list={price} handleFilters={(filters) => handleFilters(filters, "price")}/>
                        </li>
                    </ul>
                </nav>

                <Route component={() => <MenuCards data={Products} itemsPerPage={16} searchByData={[
                    {label: 'Парфюмер', value: 'perfumer'},
                    {label: 'Название парфюма', value: 'perfumeTitle'},
                    {label: 'Страна производитель', value: 'country'}]}/>}
                />

            </div>
        </div>
    )
}

export default Menu