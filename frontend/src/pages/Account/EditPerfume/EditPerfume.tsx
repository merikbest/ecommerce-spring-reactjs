import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {RouteComponentProps} from 'react-router-dom';

import {fetchPerfume, fetchPerfumes} from "../../../redux/thunks/perfume-thunks";
import {formReset, updatePerfume} from "../../../redux/thunks/admin-thunks";
import {AppStateType} from "../../../redux/reducers/root-reducer";
import {Perfume, PerfumeErrors} from "../../../types/types";
import ToastShow from "../../../component/Toasts/ToastShow";

const EditPerfume: FC<RouteComponentProps<{ id: string }>> = ({match}) => {
    const dispatch = useDispatch();
    const perfumeData: Partial<Perfume> = useSelector((state: AppStateType) => state.perfume.perfume);
    const errors: Partial<PerfumeErrors> = useSelector((state: AppStateType) => state.admin.errors);
    const isPerfumeEdited: boolean = useSelector((state: AppStateType) => state.admin.isPerfumeEdited);
    const [perfume, setPerfume] = useState<Partial<Perfume>>(perfumeData);
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

    const {
        id,
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
        filename,
        file
    } = perfume;

    useEffect(() => {
        dispatch(fetchPerfume(match.params.id));
    }, []);

    useEffect(() => {
        setPerfume(perfumeData);
        if (isPerfumeEdited) {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false)
                dispatch(formReset());
            }, 5000);
            window.scrollTo(0, 0);
            dispatch(fetchPerfumes());
        }
    }, [perfumeData]);

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const bodyFormData: FormData = new FormData();
        bodyFormData.append("file", file);
        bodyFormData.append("perfume", new Blob([JSON.stringify({
            id,
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
            filename,
            price
        })], {type: "application/json"}));

        dispatch(updatePerfume(bodyFormData));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {name, files} = event.target;
        if (files) {
            setPerfume({...perfume, [name]: files[0]});
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
        const {name, value} = event.target;
        setPerfume({...perfume, [name]: value});
    };

    return (
        <>
            <ToastShow showToast={showToast} message={"Perfume successfully edited!"}/>
            <div className="container">
                <h4><FontAwesomeIcon className="mr-2" icon={faEdit}/>Edit perfume</h4>
                <form onSubmit={onFormSubmit}>
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label font-weight-bold">Perfume title: </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={perfumeTitleError ? "form-control is-invalid" : "form-control"}
                                        name="perfumeTitle"
                                        value={perfumeTitle}
                                        onChange={handleInputChange}/>
                                    <div className="invalid-feedback">{perfumeTitleError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label font-weight-bold">Brand: </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={perfumerError ? "form-control is-invalid" : "form-control"}
                                        name="perfumer"
                                        value={perfumer}
                                        onChange={handleInputChange}/>
                                    <div className="invalid-feedback">{perfumerError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label font-weight-bold">Release year: </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={yearError ? "form-control is-invalid" : "form-control"}
                                        name="year"
                                        value={year}
                                        onChange={handleInputChange}/>
                                    <div className="invalid-feedback">{yearError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label font-weight-bold">Country: </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={countryError ? "form-control is-invalid" : "form-control"}
                                        name="country"
                                        value={country}
                                        onChange={handleInputChange}/>

                                    <div className="invalid-feedback">{countryError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label font-weight-bold">Perfume type: </label>
                                <div className="col-sm-8">
                                    <select name="type"
                                            className={typeError ? "form-control is-invalid" : "form-control"}
                                            onChange={handleInputChange}>
                                        {perfumeData.type === "Eau de Parfum" ?
                                            <>
                                                <option value={perfumeData.type}>{perfumeData.type}</option>
                                                <option value="Eau de Toilette">Eau de Toilette</option>
                                            </> :
                                            <>
                                                <option value={perfumeData.type}>{perfumeData.type}</option>
                                                <option value="Eau de Parfum">Eau de Parfum</option>
                                            </>}
                                    </select>
                                    <div className="invalid-feedback">{typeError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label font-weight-bold">Volume: </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={volumeError ? "form-control is-invalid" : "form-control"}
                                        name="volume"
                                        value={volume}
                                        onChange={handleInputChange}/>
                                    <div className="invalid-feedback">{volumeError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label font-weight-bold">Gender: </label>
                                <div className="col-sm-8">
                                    <select name="perfumeGender"
                                            className={perfumeGenderError ? "form-control is-invalid" : "form-control"}
                                            onChange={handleInputChange}>
                                        {perfumeData.perfumeGender === "male" ?
                                            <>
                                                <option value={perfumeData.perfumeGender}>{perfumeData.perfumeGender}</option>
                                                <option value="female">female</option>
                                            </> :
                                            <>
                                                <option value={perfumeData.perfumeGender}>{perfumeData.perfumeGender}</option>
                                                <option value="male">male</option>
                                            </>}
                                    </select>
                                    <div className="invalid-feedback">{perfumeGenderError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label font-weight-bold">Top notes: </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={fragranceTopNotesError ? "form-control is-invalid" : "form-control"}
                                        name="fragranceTopNotes"
                                        value={fragranceTopNotes}
                                        onChange={handleInputChange}/>
                                    <div className="invalid-feedback">{fragranceTopNotesError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label font-weight-bold">Heart notes: </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={fragranceMiddleNotesError ? "form-control is-invalid" : "form-control"}
                                        name="fragranceMiddleNotes"
                                        value={fragranceMiddleNotes}
                                        onChange={handleInputChange}/>
                                    <div className="invalid-feedback">{fragranceMiddleNotesError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label font-weight-bold">Base notes: </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={fragranceBaseNotesError ? "form-control is-invalid" : "form-control"}
                                        name="fragranceBaseNotes"
                                        value={fragranceBaseNotes}
                                        onChange={handleInputChange}/>
                                    <div className="invalid-feedback">{fragranceBaseNotesError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label font-weight-bold">Price: </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={priceError ? "form-control is-invalid" : "form-control"}
                                        name="price"
                                        value={price}
                                        onChange={handleInputChange}/>
                                    <div className="invalid-feedback">{priceError}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img src={filename} className="rounded mx-auto w-100 mb-2"/>
                            <input type="file" name="file" onChange={handleFileChange}/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-dark">
                        <FontAwesomeIcon className="mr-2" icon={faEdit}/>Edit
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditPerfume;

