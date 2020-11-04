import React, {useEffect, useState} from 'react';
import ShopService from "../../../services/ShopService";
import {Redirect} from "react-router-dom";

function Product(props) {
    const [id, setId] = useState(props.match.params.id);
    const [perfume, setPerfume] = useState({});

    useEffect(() => {
        ShopService.getPerfumeById(id)
            .then((response) => {
                setPerfume(response.data)
            });
    }, [])

    const addToCart = () => {
        ShopService.addToCart(perfume)
            .then((response) => {
                props.history.push("/rest/cart");
            });
    }

    return (
        <div>
            <div className="container mt-5 pb-5">
                <div className="row">
                    <div className="col-md-5">
                        <div>
                            <img src={`http://localhost:8080/img/${perfume.filename}`}
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
                                    className="btn btn-dark mx-3"
                                    onClick={addToCart}>В корзину
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

export default Product;