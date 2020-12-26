import React, {Component} from 'react';
import Carousel from "react-bootstrap/Carousel";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {IMG_URL} from "../../utils/constants/url";
import {fetchPerfumes} from "../../actions/perfume-actions"
import "./PerfumeCardsSlider.css";

class PerfumeCardsSlider extends Component {
    componentDidMount() {
        this.props.fetchPerfumes();
    }

    render() {
        const perfumesId = [39, 56, 119, 59, 47, 95, 89, 98, 52, 40, 92, 99];
        const {perfumes} = this.props;
        const settings = {controls: false}

        const addCarouselItems = (array, counter) => {
            return (
                <Carousel.Item>
                    <div className="card-deck">
                        {array.map((perfume) => {
                            for (let i = counter; i < counter + 4; i++) {
                                if (perfume.id === perfumesId[i]) {
                                    return (
                                        <div className="card" key={perfume.id}>
                                            <img className="d-block mx-auto w-50"
                                                 src={IMG_URL + `${perfume.filename}`}/>
                                            <div className="card-body text-center">
                                                <h5>{perfume.perfumeTitle}</h5>
                                                <h6>{perfume.perfumer}</h6>
                                                <h6><span>{perfume.price}</span>,00 грн.</h6>
                                                <Link to={`/product/${perfume.id}`}>
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
            );
        }

        return (
            <div>
                <div className="container text-center my-3" style={{width: "200px"}}>
                    <h4>Новинки</h4>
                </div>
                <div className="container mt-5" id="indicators">
                    <form method="get" action="/">
                        <Carousel {...settings}>
                            {addCarouselItems(perfumes, 0)}
                            {addCarouselItems(perfumes, 4)}
                            {addCarouselItems(perfumes, 8)}
                        </Carousel>
                    </form>
                </div>
            </div>
        );
    }
}

PerfumeCardsSlider.propTypes = {
    fetchPerfumes: PropTypes.func.isRequired,
    perfumes: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    perfumes: state.perfume.perfumes,
});

export default connect(mapStateToProps, {fetchPerfumes})(PerfumeCardsSlider);
