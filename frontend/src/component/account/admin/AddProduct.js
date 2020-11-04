import React, {useState} from 'react';
import ShopService from "../../../services/ShopService"

function AddProduct(props) {
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
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});

    const onFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            perfumeTitle, perfumer, year, country, type, volume, perfumeGender, fragranceTopNotes,
            fragranceMiddleNotes, fragranceBaseNotes, price, file
        }

        setPerfume(data);

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

        ShopService.addPerfumeToBd(bodyFormData)
            .then((response) => {
                props.history.push("/rest/account")
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
        <div id="container">
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
                <input type="file" name="file" onChange={(event) => setFile(event.target.files[0])}/>
            </div>
        </div>
    );
}

export default AddProduct;