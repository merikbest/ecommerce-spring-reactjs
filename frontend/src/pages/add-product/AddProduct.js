import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import ToastShow from "../../component/toasts/ToastShow";
import AccountNavbar from "../../component/account-navbar/AccountNavbar";
import {addPerfume} from "../../actions/admin-actions";

class AddProduct extends Component {
    initialState = {
        perfumeTitle: "",
        perfumer: "",
        year: "",
        country: "",
        type: "",
        volume: "",
        perfumeGender: "",
        fragranceTopNotes: "",
        fragranceMiddleNotes: "",
        fragranceBaseNotes: "",
        price: "",
        file: null
    };

    state = {
        ...this.initialState,
        showToast: false
    };

    onFormSubmit = (event) => {
        event.preventDefault();

        const {
            perfumeTitle, perfumer, year, country, type, volume, perfumeGender, fragranceTopNotes, fragranceMiddleNotes,
            fragranceBaseNotes, price, file
        } = this.state;

        const bodyFormData = new FormData();

        bodyFormData.append("file", file);
        bodyFormData.append("perfumeTitle", perfumeTitle);
        bodyFormData.append("perfumer", perfumer);
        bodyFormData.append("year", year);
        bodyFormData.append("country", country);
        bodyFormData.append("type", type);
        bodyFormData.append("volume", volume);
        bodyFormData.append("perfumeGender", perfumeGender);
        bodyFormData.append("fragranceTopNotes", fragranceTopNotes);
        bodyFormData.append("fragranceMiddleNotes", fragranceMiddleNotes);
        bodyFormData.append("fragranceBaseNotes", fragranceBaseNotes);
        bodyFormData.append("price", price);

        this.props.addPerfume(bodyFormData)
            .then(() => {
                if (this.props.admin.success) {
                    this.setState({
                        ...this.initialState,
                        showToast: true
                    });
                    setTimeout(() => this.setState({showToast: false}), 5000);
                    window.scrollTo(0, 0);
                }
            });
    };

    handleFileChange = (event) => {
        this.setState({
            file: event.target.files[0]
        });
    };

    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {
            perfumeTitle, perfumer, year, country, type, volume, perfumeGender, fragranceTopNotes, fragranceMiddleNotes,
            fragranceBaseNotes, price, showToast
        } = this.state;

        const {
            perfumeTitleError, perfumerError, yearError, countryError, typeError, volumeError,
            perfumeGenderError, fragranceTopNotesError, fragranceMiddleNotesError, fragranceBaseNotesError,
            priceError
        } = this.props.admin.errors;

        return (
            <div>
                <AccountNavbar/>
                <div className="container" style={{"display": showToast ? "block" : "none"}}>
                    <ToastShow showToast={showToast} message={"Товар успешно сохранен!"}/>
                </div>
                <div className="container mt-5 pb-5">
                    <h5>Заполните форму</h5>
                    <br/>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Название парфюма: </label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className={perfumeTitleError ? "form-control is-invalid" : "form-control"}
                                name="perfumeTitle"
                                value={perfumeTitle}
                                onChange={this.handleChange}/>
                            <div className="invalid-feedback">{perfumeTitleError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Парфюмер: </label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className={perfumerError ? "form-control is-invalid" : "form-control"}
                                name="perfumer"
                                value={perfumer}
                                onChange={this.handleChange}/>
                            <div className="invalid-feedback">{perfumerError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Год выпуска: </label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className={yearError ? "form-control is-invalid" : "form-control"}
                                name="year"
                                value={year}
                                onChange={this.handleChange}/>
                            <div className="invalid-feedback">{yearError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Страна: </label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className={countryError ? "form-control is-invalid" : "form-control"}
                                name="country"
                                value={country}
                                onChange={this.handleChange}/>
                            <div className="invalid-feedback">{countryError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Тип: </label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className={typeError ? "form-control is-invalid" : "form-control"}
                                name="type"
                                value={type}
                                onChange={this.handleChange}/>
                            <div className="invalid-feedback">{typeError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Объем: </label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className={volumeError ? "form-control is-invalid" : "form-control"}
                                name="volume"
                                value={volume}
                                onChange={this.handleChange}/>
                            <div className="invalid-feedback">{volumeError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Пол: </label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className={perfumeGenderError ? "form-control is-invalid" : "form-control"}
                                name="perfumeGender"
                                value={perfumeGender}
                                onChange={this.handleChange}/>
                            <div className="invalid-feedback">{perfumeGenderError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Верхние ноты: </label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className={fragranceTopNotesError ? "form-control is-invalid" : "form-control"}
                                name="fragranceTopNotes"
                                value={fragranceTopNotes}
                                onChange={this.handleChange}/>
                            <div className="invalid-feedback">{fragranceTopNotesError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Средние ноты: </label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className={fragranceMiddleNotesError ? "form-control is-invalid" : "form-control"}
                                name="fragranceMiddleNotes"
                                value={fragranceMiddleNotes}
                                onChange={this.handleChange}/>
                            <div className="invalid-feedback">{fragranceMiddleNotesError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Базовые ноты: </label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className={fragranceBaseNotesError ? "form-control is-invalid" : "form-control"}
                                name="fragranceBaseNotes"
                                value={fragranceBaseNotes}
                                onChange={this.handleChange}/>
                            <div className="invalid-feedback">{fragranceBaseNotesError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Цена: </label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className={priceError ? "form-control is-invalid" : "form-control"}
                                name="price"
                                value={price}
                                onChange={this.handleChange}/>
                            <div className="invalid-feedback">{priceError}</div>
                        </div>
                    </div>
                    <button className="btn btn-dark mr-5" onClick={this.onFormSubmit}>Добавить</button>
                    <input type="file"
                           name="file"
                           onChange={this.handleFileChange}/>
                </div>
            </div>
        );
    }
}

AddProduct.propTypes = {
    addPerfume: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    admin: state.admin
});

export default connect(mapStateToProps, {addPerfume})(AddProduct);
