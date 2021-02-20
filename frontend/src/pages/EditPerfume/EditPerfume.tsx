import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {RouteComponentProps, useHistory} from 'react-router-dom';

import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
import {fetchPerfume} from "../../redux/thunks/perfume-thunks";
import {formReset, updatePerfume} from "../../redux/thunks/admin-thunks";
import {IMG_URL} from "../../utils/constants/url";
import {AppStateType} from "../../redux/reducers/root-reducer";

type PropsType = {
    id: string
};

const EditPerfume: FC<RouteComponentProps<PropsType>> = ({match}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const perfumeData = useSelector((state: AppStateType) => state.perfume.perfume);
    const errors = useSelector((state: AppStateType) => state.admin.errors);
    const [perfume, setPerfume] = useState(perfumeData);

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
        dispatch(formReset());
    }, []);

    useEffect(() => {
        setPerfume(perfumeData);
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
            price
        })], {type: "application/json"}));

        dispatch(updatePerfume(bodyFormData, history));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {name, files} = event.target;
        if (files) {
            setPerfume({...perfume, [name]: files[0]});
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        setPerfume({...perfume, [name]: value});
    };

    return (
        <div>
            <AccountNavbar/>
            <div className="container mt-5">
                <h4><FontAwesomeIcon className="mr-2" icon={faEdit}/>Edit perfume</h4>
                <form onSubmit={onFormSubmit}>
                    <div className="col-md-5 mb-5 mt-5">
                        <img src={IMG_URL + `${filename}`} className="rounded mx-auto w-100 mb-2"/>
                        <input type="file" name="file" onChange={handleFileChange}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Perfume title: </label>
                        <div className="col-sm-6">
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
                        <label className="col-sm-2 col-form-label">Brand: </label>
                        <div className="col-sm-6">
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
                        <label className="col-sm-2 col-form-label">Release year: </label>
                        <div className="col-sm-6">
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
                        <label className="col-sm-2 col-form-label">Manufacturer country: </label>
                        <div className="col-sm-6">
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
                        <label className="col-sm-2 col-form-label">Perfume type: </label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className={typeError ? "form-control is-invalid" : "form-control"}
                                name="type"
                                value={type}
                                onChange={handleInputChange}/>
                            <div className="invalid-feedback">{typeError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Volume: </label>
                        <div className="col-sm-6">
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
                        <label className="col-sm-2 col-form-label">Gender: </label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className={perfumeGenderError ? "form-control is-invalid" : "form-control"}
                                name="perfumeGender"
                                value={perfumeGender}
                                onChange={handleInputChange}/>
                            <div className="invalid-feedback">{perfumeGenderError}</div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Top notes: </label>
                        <div className="col-sm-6">
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
                        <label className="col-sm-2 col-form-label">Heart notes: </label>
                        <div className="col-sm-6">
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
                        <label className="col-sm-2 col-form-label">Base notes: </label>
                        <div className="col-sm-6">
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
                        <label className="col-sm-2 col-form-label">Price: </label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className={priceError ? "form-control is-invalid" : "form-control"}
                                name="price"
                                value={price}
                                onChange={handleInputChange}/>
                            <div className="invalid-feedback">{priceError}</div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-dark">
                        <FontAwesomeIcon className="mr-2" icon={faEdit}/>Edit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditPerfume;

