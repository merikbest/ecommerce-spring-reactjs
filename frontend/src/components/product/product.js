import React, {Component} from 'react';
import ShopService from "../../services/shop-service";

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            perfume: {}
        }
    }

    componentDidMount() {
        ShopService.getProductById(this.state.id)
            .then((response) => {
                this.setState({perfume: response.data})
            });
    }

    render() {
        const {id, filename, perfumeTitle, perfumer, price, type, year, volume, country, perfumeGender,
            fragranceTopNotes, fragranceMiddleNotes, fragranceBaseNotes} = this.state.perfume;

        return (
            <div>
                <div className="container mt-5 pb-5">
                    <div className="row">
                        <div className="col-md-5">
                            <div>
                                <img src={`http://localhost:8080/img/${filename}`} className="rounded mx-auto w-100"/>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <h2>{perfumeTitle}</h2>
                            <h3>{perfumer}</h3>
                            <p>Код товара: <span>{id}</span></p>
                            <p style={{color: "#54C0A1"}}>Есть в наличии</p>
                            <div className="row ml-1">
                                <h6 className="mr-5"><span>{price}</span>,00 грн.</h6>
                                <form action="/cart/add" method="post">
                                    <button type="submit"
                                            name="add"
                                            className="btn btn-dark mx-3"
                                            value={id}>В корзину
                                    </button>
                                </form>
                            </div>
                            <br/>
                            <table className="table">
                                <tbody>
                                <tr>
                                    <td>Название парфюма:</td>
                                    <td>{perfumeTitle}</td>
                                </tr>
                                <tr>
                                    <td>Парфюмер:</td>
                                    <td>{perfumer}</td>
                                </tr>
                                <tr>
                                    <td>Тип:</td>
                                    <td>{type}</td>
                                </tr>
                                <tr>
                                    <td>Год выпуска:</td>
                                    <td>{year}</td>
                                </tr>
                                <tr>
                                    <td>Объем:</td>
                                    <td><span>{volume}</span> мл.</td>
                                </tr>
                                <tr>
                                    <td>Страна производитель:</td>
                                    <td>{country}</td>
                                </tr>
                                <tr>
                                    <td>Пол:</td>
                                    <td>{perfumeGender}</td>
                                </tr>
                                <tr>
                                    <td>Верхние ноты:</td>
                                    <td>{fragranceTopNotes}</td>
                                </tr>
                                <tr>
                                    <td>Средние ноты:</td>
                                    <td>{fragranceMiddleNotes}</td>
                                </tr>
                                <tr>
                                    <td>Базовые ноты:</td>
                                    <td>{fragranceBaseNotes}</td>
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

export default Product;