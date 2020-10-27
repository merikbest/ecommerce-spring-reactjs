import React, {Component} from 'react';
import ShopService from "../../../services/shop-service";
import Input from "../../parts/Input";


export default class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            perfume: {},
            completed: false,
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
            file: null,
            errors: {},
        }

        this.onChangeData = this.onChangeData.bind(this);
        this.handleInputChangeFile = this.handleInputChangeFile.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const {
            perfumeTitle, perfumer, year, country, type, volume, perfumeGender, fragranceTopNotes,
            fragranceMiddleNotes, fragranceBaseNotes, price
        } = this.state;

        const data = {
            perfumeTitle, perfumer, year, country, type, volume, perfumeGender, fragranceTopNotes,
            fragranceMiddleNotes, fragranceBaseNotes, price
        }

        this.setState({
            perfume: data
        })

        const bodyFormData = new FormData();
        bodyFormData.append("file", this.state.file);
        // bodyFormData.append("perfume", this.state.perfume);
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

        ShopService.addProductToBd(bodyFormData)
            .then((response) => {
                this.props.history.push("/rest/account")
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data
                })
            });
    }

    onChangeData(type, event) {
        const stateData = this.state;
        stateData[type] = event

        this.setState({stateData});
    }

    handleInputChangeFile = (event) => {
        this.setState({
            file: event.target.files[0]
        });
    }

    render() {

        const {
            perfumeTitleError, perfumerError, yearError, countryError, typeError, volumeError,
            perfumeGenderError, fragranceTopNotesError, fragranceMiddleNotesError, fragranceBaseNotesError,
            priceError
        } = this.state.errors;

        const {
            perfumeTitle, perfumer, year, country, type, volume, perfumeGender, fragranceTopNotes,
            fragranceMiddleNotes, fragranceBaseNotes, price, file
        } = this.state;

        return (
            <div id="container">
                <div className="container mt-5 pb-5">
                    <h5>Заполните форму</h5>
                    <br/>
                    <Input
                        label={"Название парфюма:"}
                        error={perfumeTitleError}
                        type="text"
                        name="perfumeTitle"
                        valueName={perfumeTitle}
                        onChangeData={this.onChangeData}
                    />
                    <Input
                        label={"Парфюмер:"}
                        error={perfumerError}
                        type="text"
                        name="perfumer"
                        valueName={perfumer}
                        onChangeData={this.onChangeData}
                    />
                    <Input
                        label={"Год выпуска:"}
                        error={yearError}
                        type="text"
                        name="year"
                        valueName={year}
                        onChangeData={this.onChangeData}
                    />
                    <Input
                        label={"Страна:"}
                        error={countryError}
                        type="text"
                        name="country"
                        valueName={country}
                        onChangeData={this.onChangeData}
                    />
                    <Input
                        label={"Тип:"}
                        error={typeError}
                        type="text"
                        name="type"
                        valueName={type}
                        onChangeData={this.onChangeData}
                    />
                    <Input
                        label={"Объем:"}
                        error={volumeError}
                        type="text"
                        name="volume"
                        valueName={volume}
                        onChangeData={this.onChangeData}
                    />
                    <Input
                        label={"Пол:"}
                        error={perfumeGenderError}
                        type="text"
                        name="perfumeGender"
                        valueName={perfumeGender}
                        onChangeData={this.onChangeData}
                    />
                    <Input
                        label={"Верхние ноты:"}
                        error={fragranceTopNotesError}
                        type="text"
                        name="fragranceTopNotes"
                        valueName={fragranceTopNotes}
                        onChangeData={this.onChangeData}
                    />
                    <Input
                        label={"Средние ноты:"}
                        error={fragranceMiddleNotesError}
                        type="text"
                        name="fragranceMiddleNotes"
                        valueName={fragranceMiddleNotes}
                        onChangeData={this.onChangeData}
                    />
                    <Input
                        label={"Базовые ноты:"}
                        error={fragranceBaseNotesError}
                        type="text"
                        name="fragranceBaseNotes"
                        valueName={fragranceBaseNotes}
                        onChangeData={this.onChangeData}
                    />
                    <Input
                        label={"Цена:"}
                        error={priceError}
                        type="text"
                        name="price"
                        valueName={price}
                        onChangeData={this.onChangeData}
                    />

                    <button className="btn btn-dark" onClick={this.onFormSubmit}>Добавить</button>
                    <input type="file" name="file" onChange={this.handleInputChangeFile}/>
                </div>
            </div>
        );
    }
}
