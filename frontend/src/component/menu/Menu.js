import React, {useState} from "react";
import {perfumer, gender, price} from "./MenuData";
import {Collapse} from "reactstrap";
import {Link} from "react-router-dom";
import Checkbox from "./Checkbox";
import ShopService from "../../services/ShopService";
import "./MenuStyle.css";

function LandingPage() {
    const [isOpen1, setIsOpen1] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const [isOpen3, setIsOpen3] = useState(false)
    const [Products, setProducts] = useState([])
    const [Filters, setFilters] = useState({
        perfumer: []
        // , price: []
    })

    // костыль)
    // if (Products === null || Filters.perfumer === null || isOpen2 === false) {
    //     ShopService.getProducts()
    //         .then((response) => {
    //             setProducts(response.data)
    //         })
    // }



    const getProducts = (variables) => {
        console.log(variables);
        ShopService.getProductsByFilterParams(variables)
            .then((response) => {
                setProducts(response.data)
            })
    }

    // const handlePrice = (value) => {
    //     const data = price;
    //     let array = [];
    //
    //     for (let key in data) {
    //
    //         if (data[key].id === parseInt(value, 10)) {
    //             array = data[key].array;
    //         }
    //     }
    //
    //     return array
    // }

    const handleFilters = (filters) => {
        // const newFilters = filters

        // if (category === "price") {
        //     let priceValues = handlePrice(filters)
        //     newFilters[category] = priceValues
        // }

        getProducts(filters)
        setFilters(filters)
    }

    return (
        <div className="container">
            <div className="d-flex">
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <h3>Парфюмерия</h3>
                    </div>
                    <ul className="list-unstyled components">
                        <li className="active">
                            <a data-toggle="collapse" className="dropdown-toggle"
                               onClick={() => setIsOpen1(!isOpen1)}
                            >Цена</a>
                            <Collapse isOpen={isOpen1}>
                                <Checkbox list={price} handleFilters={(filters) => handleFilters(filters)}/>
                            </Collapse>
                        </li>

                        <li className="active">
                            <a data-toggle="collapse" className="dropdown-toggle"
                               onClick={() => setIsOpen2(!isOpen2)}
                            >Бренд</a>
                            <Collapse isOpen={isOpen2}>
                                <Checkbox list={perfumer} handleFilters={(filters) => handleFilters(filters)}/>
                            </Collapse>
                        </li>

                        <li className="active">
                            <a data-toggle="collapse" className="dropdown-toggle"
                               onClick={() => setIsOpen3(!isOpen3)}
                            >Пол</a>
                            <Collapse isOpen={isOpen3}>
                                <Checkbox list={gender} handleFilters={(filters) => handleFilters(filters)}/>
                            </Collapse>
                        </li>
                    </ul>
                </nav>

                <div className="row mt-5 ml-5">
                    <div className="container-fluid mt-5">
                        <div className="row">
                            {Products.map((perfume) => {
                                return (
                                    <div className="col-lg-3 d-flex align-items-stretch">
                                        <div className="card mb-5">
                                            <img className="d-block mx-auto w-50"
                                                 src={`http://localhost:8080/img/${perfume.filename}`}/>
                                            <div className="card-body text-center">
                                                <h5>{perfume.perfumeTitle}</h5>
                                                <h6>{perfume.perfumer}</h6>
                                                <h6><span>{perfume.price}</span>,00 грн.</h6>
                                            </div>
                                            <div className="text-center align-items-end mb-3">
                                                <Link to={`/rest/product/${perfume.id}`}>
                                                    <span className="btn btn-dark">Купить</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LandingPage
