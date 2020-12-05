import React, {useEffect, useState} from 'react';
import ShopService from "../../services/ShopService";
import AccountNavbar from "../../component/account-navbar/AccountNavbar";
import {IMG_URL} from "../../constants";

function EditProduct(props) {
    const [id, setId] = useState(props.match.params.id);
    const [perfume, setPerfume] = useState({});
    const [perfumeTitle, setPerfumeTitle] = useState("");
    const [perfumer, setPerfumer] = useState("");
    const [year, setYear] = useState("");
    const [country, setCountry] = useState("");
    const [type, setType] = useState("");
    const [volume, setVolume] = useState("");
    const [perfumeGender, setPerfumeGender] = useState("");
    const [fragranceTopNotes, setFragranceTopNotes] = useState("");
    const [fragranceMiddleNotes, setFragranceMiddleNotes] = useState("");
    const [fragranceBaseNotes, setFragranceBaseNotes] = useState("");
    const [price, setPrice] = useState("");
    const [filename, setFilename] = useState("");
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        ShopService.getPerfumeById(id)
            .then((response) => {
                setPerfumeTitle(response.data.perfumeTitle);
                setPerfumer(response.data.perfumer);
                setYear(response.data.year);
                setCountry(response.data.country);
                setType(response.data.type);
                setVolume(response.data.volume);
                setPerfumeGender(response.data.perfumeGender);
                setFragranceTopNotes(response.data.fragranceTopNotes);
                setFragranceMiddleNotes(response.data.fragranceMiddleNotes);
                setFragranceBaseNotes(response.data.fragranceBaseNotes);
                setPrice(response.data.price);
                setFilename(response.data.filename);
                setPrice(response.data.price);
                setPerfume(response.data);
            });
    }, [])

    const onFormSubmit = (event) => {
        event.preventDefault();

        const bodyFormData = new FormData();
        bodyFormData.append("file", file);
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

        ShopService.updatePerfume(bodyFormData)
            .then((response) => {
                props.history.push("/product/list/edit")
            })
            .catch((error) => {
                setErrors(error.response.data)
            });
    }

    const {
        perfumeTitleError, perfumerError, yearError, countryError, typeError, volumeError,
        perfumeGenderError, fragranceTopNotesError, fragranceMiddleNotesError, fragranceBaseNotesError,
        priceError
    } = errors;

    return (
        <div>
            <AccountNavbar/>
            <div className="container mt-5">

                <div className="col-md-5 mb-5">
                    <img src={IMG_URL + `${filename}`}
                         className="rounded mx-auto w-100 mb-2"/>
                    <input type="file" name="file" onChange={(event) => setFile(event.target.files[0])}/>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Название парфюма: </label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className={perfumeTitleError ? "form-control is-invalid" : "form-control"}
                            name="perfumeTitle"
                            value={perfumeTitle}
                            onChange={(event) => setPerfumeTitle(event.target.value)}
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
                            onChange={(event) => setPerfumer(event.target.value)}
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
                            onChange={(event) => setYear(event.target.value)}
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
                            onChange={(event) => setCountry(event.target.value)}
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
                            onChange={(event) => setType(event.target.value)}
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
                            onChange={(event) => setVolume(event.target.value)}
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
                            onChange={(event) => setPerfumeGender(event.target.value)}
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
                            onChange={(event) => setFragranceTopNotes(event.target.value)}
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
                            onChange={(event) => setFragranceMiddleNotes(event.target.value)}
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
                            onChange={(event) => setFragranceBaseNotes(event.target.value)}
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
                            onChange={(event) => setPrice(event.target.value)}
                        />
                        <div className="invalid-feedback">{priceError}</div>
                    </div>
                </div>

                <button className="btn btn-dark" onClick={onFormSubmit}>Добавить</button>
            </div>
        </div>
    );
}

export default EditProduct;