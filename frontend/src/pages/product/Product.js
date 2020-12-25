import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";

import {IMG_URL} from "../../constants/url";
import {fetchPerfume} from "../../actions/perfume-actions";
import {addToCart} from "../../actions/cart-actions";

class Product extends Component {

    componentDidMount() {
        this.props.fetchPerfume(this.props.match.params.id);

        window.scrollTo(0, 0);
    }

    addToCart = () => {
        if (!localStorage.getItem("isLoggedIn")) {
            this.props.history.push("/login");
        } else {
            this.props.addToCart(this.props.perfume.perfume, this.props.history);
        }
    }

    render() {
        const {perfume} = this.props.perfume;

        return (
            <div>
                <div className="container mt-5 pb-5">
                    <div className="row">
                        <div className="col-md-5">
                            <div>
                                <img src={IMG_URL + `${perfume.filename}`}
                                     className="rounded mx-auto w-100"/>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <h2>{perfume.perfumeTitle}</h2>
                            <h3>{perfume.perfumer}</h3>
                            <p>Код товара: <span>{perfume.id}</span></p>
                            <p style={{color: "#54C0A1"}}>Есть в наличии</p>
                            <div className="row ml-1">
                                <h6 className="mr-5"><span>{perfume.price}</span>,00 грн.</h6>
                                <button type="submit"
                                        className="btn btn-success mx-3"
                                        onClick={this.addToCart}>
                                    <FontAwesomeIcon className="mr-2 fa-lg" icon={faCartPlus}/> В корзину
                                </button>
                            </div>
                            <br/>
                            <table className="table">
                                <tbody>
                                <tr>
                                    <td>Название парфюма:</td>
                                    <td>{perfume.perfumeTitle}</td>
                                </tr>
                                <tr>
                                    <td>Парфюмер:</td>
                                    <td>{perfume.perfumer}</td>
                                </tr>
                                <tr>
                                    <td>Тип:</td>
                                    <td>{perfume.type}</td>
                                </tr>
                                <tr>
                                    <td>Год выпуска:</td>
                                    <td>{perfume.year}</td>
                                </tr>
                                <tr>
                                    <td>Объем:</td>
                                    <td><span>{perfume.volume}</span> мл.</td>
                                </tr>
                                <tr>
                                    <td>Страна производитель:</td>
                                    <td>{perfume.country}</td>
                                </tr>
                                <tr>
                                    <td>Пол:</td>
                                    <td>{perfume.perfumeGender}</td>
                                </tr>
                                <tr>
                                    <td>Верхние ноты:</td>
                                    <td>{perfume.fragranceTopNotes}</td>
                                </tr>
                                <tr>
                                    <td>Средние ноты:</td>
                                    <td>{perfume.fragranceMiddleNotes}</td>
                                </tr>
                                <tr>
                                    <td>Базовые ноты:</td>
                                    <td>{perfume.fragranceBaseNotes}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Product.propTypes = {
    fetchPerfume: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    perfume: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    perfume: state.perfume
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPerfume: (id) => dispatch(fetchPerfume(id)),
        addToCart: (id, history) => dispatch(addToCart(id, history)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
