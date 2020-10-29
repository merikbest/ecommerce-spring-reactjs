import React, {Component} from 'react';
import "react-input-range/lib/css/index.css";
import "./menu-style.css";
import {Collapse} from "reactstrap";
import {brands, gender} from "./menu-data";
import InputRange from "react-input-range";
import {Link} from "react-router-dom";
import ShopService from "../../services/shop-service";

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            minPerfumePrice: 0,
            maxPerfumePrice: 5000,
            isOpen1: false,
            isOpen2: false,
            isOpen3: false,
            perfumes: []
        }
    }

    componentDidMount() {
        ShopService.getProducts()
            .then((response) => {
                this.setState({perfumes: response.data})
            });
    }

    render() {
        const {perfumes, minPerfumePrice, maxPerfumePrice, value, isOpen1, isOpen2, isOpen3} = this.state;

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
                                   onClick={() => this.setState({isOpen1: !isOpen1})}
                                >Цена</a>
                                <Collapse isOpen={isOpen1}>
                                    <ul className="list-unstyled" id="homeSubmenu1">
                                        <li>
                                            <div>
                                                <div className="form-row form-group">
                                                    <div className="col">
                                                        <input type="text" name="startingPrice" className="form-control"
                                                               value={value}/>
                                                    </div>
                                                    <div className="col">
                                                        <input type="text" name="endingPrice" className="form-control"
                                                               value={maxPerfumePrice}/>
                                                    </div>
                                                </div>
                                                <InputRange
                                                    minValue={minPerfumePrice}
                                                    maxValue={maxPerfumePrice}
                                                    value={value}
                                                    onChange={(value) => this.setState({value})}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Collapse>
                            </li>

                            <li className="active">
                                <a data-toggle="collapse" className="dropdown-toggle"
                                   onClick={() => this.setState({isOpen2: !isOpen2})}
                                >Бренд</a>
                                <Collapse isOpen={isOpen2}>
                                    <ul className="list-unstyled" id="homeSubmenu2">
                                        {brands.map((brand) => {
                                            return (
                                                <li>
                                                    <div className="checkbox ml-3">
                                                        <label>
                                                            <input type="checkbox" name="perfumers"
                                                                   value={brand.label}/>
                                                            <span className="cr">
                                                                    <i className="cr-icon fas fa-check"></i></span>
                                                            {brand.label}
                                                        </label>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Collapse>
                            </li>

                            <li className="active">
                                <a data-toggle="collapse" className="dropdown-toggle"
                                   onClick={() => this.setState({isOpen3: !isOpen3})}
                                >Пол</a>
                                <Collapse isOpen={isOpen3}>
                                    <ul className="list-unstyled" id="homeSubmenu3">
                                        {gender.map((gender) => {
                                            return (
                                                <li>
                                                    <div className="checkbox ml-3">
                                                        <label>
                                                            <input type="checkbox" name="gender" value={gender.value}/>
                                                            <span className="cr"><i
                                                                className="cr-icon fas fa-check"></i></span>
                                                            {gender.label}
                                                        </label>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Collapse>
                            </li>
                        </ul>
                    </nav>

                    <div className="row mt-5 ml-5">
                        <div className="container-fluid mt-5">
                            <div className="row">
                                {perfumes.map((perfume) => {
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
        );
    }
}

export default Menu;
