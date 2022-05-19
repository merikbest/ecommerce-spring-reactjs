import React, {ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";

import ToastShow from "../../../component/Toasts/ToastShow";
import {addPerfume, formReset} from "../../../redux/admin/admin-thunks";
import {fetchPerfumes} from "../../../redux/perfumes/perfumes-thunks";
import InfoTitle from "../../../component/InfoTitle/InfoTitle";
import AddPerfumeInput from "./AddPerfumeInput/AddPerfumeInput";
import AddPerfumeSelect from "./AddPerfumeSelect/AddPerfumeSelect";
import IconButton from "../../../component/IconButton/IconButton";
import {selectAdminStateErrors, selectIsPerfumeAdded} from "../../../redux/admin/admin-selector";

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

const AddPerfume: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const isPerfumeAdded = useSelector(selectIsPerfumeAdded);
    const errors = useSelector(selectAdminStateErrors);

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
                <InfoTitle iconClass={"mr-2"} icon={faPlusSquare} title={"Add perfume"}/>
                <br/>
                <form onSubmit={onFormSubmit}>
                    <div className="form row">
                        <AddPerfumeInput
                            title={"Perfume title"}
                            error={errors.perfumeTitleError}
                            name={"perfumeTitle"}
                            value={perfumeTitle}
                            placeholder={"Enter the perfume title"}
                            onChange={handleInputChange}
                        />
                        <AddPerfumeInput
                            title={"Brand"}
                            error={errors.perfumerError}
                            name={"perfumer"}
                            value={perfumer}
                            placeholder={"Enter the brand"}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form row mt-3">
                        <AddPerfumeInput
                            title={"Release year"}
                            error={errors.yearError}
                            name={"year"}
                            value={year}
                            placeholder={"Enter the release year"}
                            onChange={handleInputChange}
                        />
                        <AddPerfumeInput
                            title={"Manufacturer country"}
                            error={errors.countryError}
                            name={"country"}
                            value={country}
                            placeholder={"Enter the manufacturer country"}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form row mt-3">
                        <AddPerfumeSelect
                            title={"Perfume type"}
                            error={errors.typeError}
                            name={"type"}
                            values={["Eau de Parfum", "Eau de Toilette"]}
                            onChange={handleInputChange}
                        />
                        <AddPerfumeInput
                            title={"Volume"}
                            error={errors.volumeError}
                            name={"volume"}
                            value={volume}
                            placeholder={"Enter the volume"}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form row mt-3">
                        <AddPerfumeSelect
                            title={"Gender"}
                            error={errors.perfumeGenderError}
                            name={"perfumeGender"}
                            values={["male", "female"]}
                            onChange={handleInputChange}
                        />
                        <AddPerfumeInput
                            title={"Top notes"}
                            error={errors.fragranceTopNotesError}
                            name={"fragranceTopNotes"}
                            value={fragranceTopNotes}
                            placeholder={"Enter the top notes"}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form row mt-3">
                        <AddPerfumeInput
                            title={"Heart notes"}
                            error={errors.fragranceMiddleNotesError}
                            name={"fragranceMiddleNotes"}
                            value={fragranceMiddleNotes}
                            placeholder={"Enter the heart notes"}
                            onChange={handleInputChange}
                        />
                        <AddPerfumeInput
                            title={"Base notes"}
                            error={errors.fragranceBaseNotesError}
                            name={"fragranceBaseNotes"}
                            value={fragranceBaseNotes}
                            placeholder={"Enter the base notes"}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form row mt-3">
                        <AddPerfumeInput
                            title={"Price"}
                            error={errors.priceError}
                            name={"price"}
                            value={price}
                            placeholder={"Enter the price"}
                            onChange={handleInputChange}
                        />
                        <div className="col" style={{marginTop: "35px"}}>
                            <input type="file" name="file" onChange={handleFileChange}/>
                        </div>
                    </div>
                    <IconButton
                        buttonText={"Add"}
                        buttonClassName={"mt-3"}
                        icon={faPlusSquare}
                        iconClassName={"mr-2"}
                    />
                </form>
            </div>
        </>
    );
};

export default AddPerfume;
