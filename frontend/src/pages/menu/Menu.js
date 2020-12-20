import React, {Component} from "react";
import {gender, perfumer, price} from "./MenuData";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import Checkbox from "../../component/checkbox/Checkbox";
import ShopService from "../../services/ShopService";
import "./MenuStyle.css";
import RadioCheckbox from "../../component/checkbox-radio/RadioCheckbox";
import MenuCards from "../../component/menu-cards/MenuCards";
import {
    fetchPerfumes,
    fetchPerfumesByPerfumer,
    fetchPerfumesByGender,
    fetchPerfumesByFilterParams
} from "../../actions/perfume-actions";

class Menu extends Component {
    state = {
        Filters: {
            perfumers: [],
            genders: [],
            prices: []
        }
    };

    // const [allProducts, setAll] = useState(props.location.state.id)
    // const [products, setProducts] = useState([])
    // const [Filters, setFilters] = useState({
    //     perfumers: [],
    //     genders: [],
    //     prices: []
    // })
    //
    // useEffect(() => {
    //     if (allProducts === "женский" || allProducts === "мужской") {
    //         window.scrollTo(0, 0);
    //         ShopService.findPerfumeByGender({perfumeGender: props.location.state.id})
    //             .then((response) => {
    //                 setProducts(response.data)
    //             })
    //     } else if (allProducts === "all") {
    //         window.scrollTo(0, 0);
    //         ShopService.getPerfumes()
    //             .then((response) => {
    //                 setProducts(response.data)
    //             })
    //     } else {
    //         window.scrollTo(0, 0);
    //         ShopService.findPerfumeByPerfumer({perfumer: props.location.state.id})
    //             .then((response) => {
    //                 setProducts(response.data)
    //             })
    //     }
    // }, [])

    componentDidMount() {
        const productType = this.props.location.state.id;

        if (productType === "женский" || productType === "мужской") {
            this.props.fetchPerfumesByGender({perfumeGender: productType});
            window.scrollTo(0, 0);
        } else if (productType === "all") {
            this.props.fetchPerfumes();
            window.scrollTo(0, 0);
        } else if (productType) {
            this.props.fetchPerfumesByPerfumer({perfumer: productType});
            window.scrollTo(0, 0);
        }

        // else {
        //     this.getProducts(this.state.Filters);
        // }
    }

    getProducts = (variables) => {
        this.props.fetchPerfumesByFilterParams(variables);

        // ShopService.getPerfumeByFilterParams(variables)
        //     .then((response) => {
        //         setProducts(response.data)
        //     })
    }

    handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key].id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }

        return array
    }

    handleFilters = (filters, category) => {
        const newFilters = {...this.state.Filters}
        newFilters[category] = filters

        if (category === "prices") {
            let priceValues = this.handlePrice(filters)
            newFilters[category] = priceValues
        }

        this.getProducts(newFilters)
        this.setState({
            Filers: newFilters
        });
        // setFilters(newFilters)
    }

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
                    {label: 'Страна производитель', value: 'country'}]}/>}
                />
            </div>
        )
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
