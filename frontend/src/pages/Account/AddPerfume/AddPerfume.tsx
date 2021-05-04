import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import ToastShow from "../../../component/Toasts/ToastShow";
import {addPerfume, formReset} from "../../../redux/thunks/admin-thunks";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import {PerfumeErrors} from "../../../types/types";
import {fetchPerfumes} from "../../../redux/thunks/perfume-thunks";

type InitialStateType = {
    perfumeTitle: string
    perfumer: string
    year: string
    country: string
    type: string
    volume: string
    perfumeGender: string
    fragranceTopNotes: string
    fragranceMiddleNotes: string
    fragranceBaseNotes: string
    price: string
    file: string | Blob
    perfumeRating: number
};

const AddPerfume: FC = () => {
    const dispatch = useDispatch();
    const isPerfumeAdded: boolean = useSelector((state: AppStateType) => state.admin.isPerfumeAdded);
    const errors: Partial<PerfumeErrors> = useSelector((state: AppStateType) => state.admin.errors);

    const initialState: InitialStateType = {
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
        file: "",
        perfumeRating: 0.0
    };

    const [{
        perfumeTitle,
        perfumer,
        year,
        country,
        type,
        volume,
        perfumeGender,
        fragranceTopNotes,
        fragranceMiddleNotes,
        fragranceBaseNotes,
        price,
        file,
        perfumeRating
    }, setState] = useState(initialState);
    const [showToast, setShowToast] = useState(false);

    const {
        perfumeTitleError,
        perfumerError,
        yearError,
        countryError,
        typeError,
        volumeError,
        perfumeGenderError,
        fragranceTopNotesError,
        fragranceMiddleNotesError,
        fragranceBaseNotesError,
        priceError
    } = errors;

    useEffect(() => {
        if (isPerfumeAdded) {
            setState({...initialState});
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false)
                dispatch(formReset());
            }, 5000);
            window.scrollTo(0, 0);
            dispatch(fetchPerfumes());
        }
    }, [isPerfumeAdded]);

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const bodyFormData: FormData = new FormData();
        bodyFormData.append("file", file);
        bodyFormData.append("perfume", new Blob([JSON.stringify({
            perfumeTitle, perfumer, year, country, type, volume, perfumeGender, fragranceTopNotes,
            fragranceMiddleNotes, fragranceBaseNotes, price, perfumeRating
        })], {type: "application/json"}));

        dispatch(addPerfume(bodyFormData));
    };

    const handleFileChange = (event: any): void => {
        setState(prevState => ({...prevState, file: event.target.files[0]}));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
        const {name, value} = event.target;
        setState(prevState => ({...prevState, [name]: value}));
    };

    return (
        <>
            <ToastShow showToast={showToast} message={"Perfume successfully added!"}/>
            <div className="container">
                <h4><FontAwesomeIcon className="mr-2" icon={faPlusSquare}/>Add perfume</h4>
                <br/>
                <form onSubmit={onFormSubmit}>
                    <div className="form row">
                        <div className="col">
                            <label>Perfume title: </label>
                            <input
                                type="text"
                                className={perfumeTitleError ? "form-control is-invalid" : "form-control"}
                                name="perfumeTitle"
                                value={perfumeTitle}
                                placeholder="Enter the perfume title"
                                onChange={handleInputChange}/>
                            <div className="invalid-feedback">{perfumeTitleError}</div>
                        </div>
                        <div className="col">
                            <label>Brand: </label>
                            <input
                                type="text"
                                className={perfumerError ? "form-control is-invalid" : "form-control"}
                                name="perfumer"
                                value={perfumer}
                                placeholder="Enter the brand"
                                onChange={handleInputChange}/>
                            <div className="invalid-feedback">{perfumerError}</div>
                        </div>
                    </div>
                    <div className="form row mt-3">
                        <div className="col">
                            <label>Release year: </label>
                            <input
                                type="text"
                                className={yearError ? "form-control is-invalid" : "form-control"}
                                name="year"
                                value={year}
                                placeholder="Enter the release year"
                                onChange={handleInputChange}/>
                            <div className="invalid-feedback">{yearError}</div>
                        </div>
                        <div className="col">
                            <label>Manufacturer country: </label>
                            <input
                                type="text"
                                className={countryError ? "form-control is-invalid" : "form-control"}
                                name="country"
                                value={country}
                                placeholder="Enter the manufacturer country"
                                onChange={handleInputChange}/>
                            <div className="invalid-feedback">{countryError}</div>
                        </div>
                    </div>
                    <div className="form row mt-3">
                        <div className="col">
                            <label>Perfume type: </label>
                            <select name="type"
                                    className={typeError ? "form-control is-invalid" : "form-control"}
                                    onChange={handleInputChange}>
                                <option hidden={true} value=""></option>
                                <option value="Eau de Parfum">Eau de Parfum</option>
                                <option value="Eau de Toilette">Eau de Toilette</option>
                            </select>
                            <div className="invalid-feedback">{typeError}</div>
                        </div>
                        <div className="col">
                            <label>Volume: </label>
                            <input
                                type="text"
                                className={volumeError ? "form-control is-invalid" : "form-control"}
                                name="volume"
                                value={volume}
                                placeholder="Enter the volume"
                                onChange={handleInputChange}/>
                            <div className="invalid-feedback">{volumeError}</div>
                        </div>
                    </div>
                    <div className="form row mt-3">
                        <div className="col">
                            <label>Gender: </label>
                            <select name="perfumeGender"
                                    className={perfumeGenderError ? "form-control is-invalid" : "form-control"}
                                    onChange={handleInputChange}>
                                <option hidden={true} value=""></option>
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                            <div className="invalid-feedback">{perfumeGenderError}</div>
                        </div>
                        <div className="col">
                            <label>Top notes: </label>
                            <input
                                type="text"
                                className={fragranceTopNotesError ? "form-control is-invalid" : "form-control"}
                                name="fragranceTopNotes"
                                value={fragranceTopNotes}
                                placeholder="Enter the top notes"
                                onChange={handleInputChange}/>
                            <div className="invalid-feedback">{fragranceTopNotesError}</div>
                        </div>
                    </div>
                    <div className="form row mt-3">
                        <div className="col">
                            <label>Heart notes: </label>
                            <input
                                type="text"
                                className={fragranceMiddleNotesError ? "form-control is-invalid" : "form-control"}
                                name="fragranceMiddleNotes"
                                value={fragranceMiddleNotes}
                                placeholder="Enter the heart notes"
                                onChange={handleInputChange}/>
                            <div className="invalid-feedback">{fragranceMiddleNotesError}</div>
                        </div>
                        <div className="col">
                            <label>Base notes: </label>
                            <input
                                type="text"
                                className={fragranceBaseNotesError ? "form-control is-invalid" : "form-control"}
                                name="fragranceBaseNotes"
                                value={fragranceBaseNotes}
                                placeholder="Enter the base notes"
                                onChange={handleInputChange}/>
                            <div className="invalid-feedback">{fragranceBaseNotesError}</div>
                        </div>
                    </div>
                    <div className="form row mt-3">
                        <div className="col">
                            <label>Price: </label>
                            <input
                                type="text"
                                className={priceError ? "form-control is-invalid" : "form-control"}
                                name="price"
                                value={price}
                                placeholder="Enter the price"
                                onChange={handleInputChange}/>
                            <div className="invalid-feedback">{priceError}</div>
                        </div>
                        <div className="col" style={{marginTop: "35px"}}>
                            <input type="file"
                                   name="file"
                                   onChange={handleFileChange}/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-dark mt-3">
                        <FontAwesomeIcon className="mr-2" icon={faPlusSquare}/>Add
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddPerfume;
