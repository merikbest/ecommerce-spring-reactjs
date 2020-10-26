import React, {Component} from 'react';
import Carousel from "react-bootstrap/Carousel";
import "./slider-cards.css"
import {Link} from "react-router-dom";
import ShopService from "../../../services/shop-service";

const perfumesId = [39, 56, 119, 59, 47, 95, 89, 98, 52, 40, 92, 99];

class SliderCards extends Component {

    state = {
        perfumes: []
    }

    async componentDidMount() {
        ShopService.getProducts()
            .then((response) => {
                this.setState({perfumes: response.data})
            });

        // const response = await fetch("/rest")
        // const body = await response.json();
        // this.setState({perfumes: body});
    }

    addCarouselItems(array, counter) {

        return (
            <Carousel.Item>
                <div className="card-deck">
                    {array.map((perfume) => {
                        for (let i = counter; i < counter + 4; i++) {
                            if (perfume.id === perfumesId[i]) {
                                return (
                                    <div className="card">
                                        <img
                                            className="d-block mx-auto w-50"
                                            src={`http://localhost:8080/img/${perfume.filename}`}/>
                                        <div className="card-body text-center">
                                            <h5>{perfume.perfumeTitle}</h5>
                                            <h6>{perfume.perfumer}</h6>
                                            <h6><span>{perfume.price}</span>,00 грн.
                                            </h6>
                                            {/*shopService.getProductById(perfume.id)*/}
                                            <Link to={`/rest/product/${perfume.id}`}>
                                                <span className="btn btn-dark">
                                                    Купить
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    })}
                </div>
            </Carousel.Item>
        )
    }

    render() {
        const {perfumes} = this.state;

        const settings = {
            controls: false
        }

        return (
            <div>
                <div className="container text-center my-3" style={{width: "200px"}}>
                    <h4>Новинки</h4>
                </div>

                <div className="container mt-5" id="indicators">
                    <form method="get" action="/rest">
                        <Carousel {...settings}>
                            {this.addCarouselItems(perfumes, 0)}
                            {this.addCarouselItems(perfumes, 4)}
                            {this.addCarouselItems(perfumes, 8)}
                        </Carousel>
                    </form>
                </div>
            </div>
        )
    }
}

export default SliderCards;