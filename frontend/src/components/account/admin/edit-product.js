import React, {Component} from 'react';
import ShopService from "../../../services/shop-service";
import Input from "../../parts/Input";

class EditProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
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
            filename: "",
            file: null,
            perfume: {},
            errors: {}
        }

        // this.onChangeData = this.onChangeData.bind(this);
        this.handleInputChangeFile = this.handleInputChangeFile.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        ShopService.getProductById(this.state.id)
            .then((response) => {
                this.setState({
                    perfumeTitle: response.data.perfumeTitle,
                    perfumer: response.data.perfumer,
                    year: response.data.year,
                    country: response.data.country,
                    type: response.data.type,
                    volume: response.data.volume,
                    perfumeGender: response.data.perfumeGender,
                    fragranceTopNotes: response.data.fragranceTopNotes,
                    fragranceMiddleNotes: response.data.fragranceMiddleNotes,
                    fragranceBaseNotes: response.data.fragranceBaseNotes,
                    price: response.data.price,
                    filename: response.data.filename,
                    perfume: response.data
                })
            });
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const {
            id, perfumeTitle, perfumer, year, country, type, volume, perfumeGender, fragranceTopNotes,
            fragranceMiddleNotes, fragranceBaseNotes, price
        } = this.state;

        // const data = {
        //     perfumeTitle, perfumer, year, country, type, volume, perfumeGender, fragranceTopNotes,
        //     fragranceMiddleNotes, fragranceBaseNotes, price
        // }
        //
        // this.setState({
        //     perfume: data
        // })

        const bodyFormData = new FormData();
        bodyFormData.append("file", this.state.file);
        // bodyFormData.append("perfume", this.state.perfume);
        bodyFormData.append("id", id);
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

        ShopService.saveEditedProductToBd(bodyFormData)
            .then((response) => {
                this.props.history.push("/rest/account")
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data
                })
            });
    }

    // onChangeData(type, event) {
    //     const stateData = this.state;
    //     stateData[type] = event
    //
    //     this.setState({stateData});
    // }

    handleInputChange(event) {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    handleInputChangeFile = (event) => {
        this.setState({
            file: event.target.files[0]
        });
    }

    render() {
        const {
            filename, perfumeTitle, perfumer, price, type, year, volume, country, perfumeGender,
            fragranceTopNotes, fragranceMiddleNotes, fragranceBaseNotes
        } = this.state;

        const {
            perfumeTitleError, perfumerError, yearError, countryError, typeError, volumeError,
            perfumeGenderError, fragranceTopNotesError, fragranceMiddleNotesError, fragranceBaseNotesError,
            priceError
        } = this.state.errors;

        return (

            <div className="container mt-5">
                <div className="col-md-5 mb-5">
                    <img src={`http://localhost:8080/img/${filename}`}
                         className="rounded mx-auto w-100 mb-2"/>
                    <input type="file" name="file"
                           onChange={this.handleInputChangeFile}/>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Название парфюма: </label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className={perfumeTitleError ? "form-control is-invalid" : "form-control"}
                            name="perfumeTitle"
                            value={perfumeTitle}
                            onChange={this.handleInputChange}
                        />
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
                            onChange={this.handleInputChange}
                        />
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
                            onChange={this.handleInputChange}
                        />
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
                            onChange={this.handleInputChange}
                        />
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
                            onChange={this.handleInputChange}
                        />
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
                            onChange={this.handleInputChange}
                        />
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
                            onChange={this.handleInputChange}
                        />
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
                            onChange={this.handleInputChange}
                        />
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
                            onChange={this.handleInputChange}
                        />
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
                            onChange={this.handleInputChange}
                        />
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
                            onChange={this.handleInputChange}
                        />
                        <div className="invalid-feedback">{priceError}</div>
                    </div>
                </div>

                <button className="btn btn-dark" onClick={this.onFormSubmit}>Добавить</button>
            </div>
        );
    }
}

export default EditProduct;