import React, { FC, FormEvent, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

import ToastShow from "../../../component/Toasts/ToastShow";
import InfoTitle from "../../../component/InfoTitle/InfoTitle";
import Input from "../../../component/Input/Input";
import AddPerfumeSelect from "./AddPerfumeSelect/AddPerfumeSelect";
import IconButton from "../../../component/IconButton/IconButton";
import { LoadingStatus } from "../../../types/types";
import {
    selectAdminStateErrors,
    selectIsAdminStateLoading,
    selectIsPerfumeAdded
} from "../../../redux-toolkit/admin/admin-selector";
import { resetAdminState, setAdminLoadingState } from "../../../redux-toolkit/admin/admin-slice";
import { addPerfume } from "../../../redux-toolkit/admin/admin-thunks";
import { useInput } from "../../../hooks/useInput";

const initialState = {
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

const AddPerfume: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const isPerfumeAdded = useSelector(selectIsPerfumeAdded);
    const isLoading = useSelector(selectIsAdminStateLoading);
    const errors = useSelector(selectAdminStateErrors);
    const [showToast, setShowToast] = useState(false);
    const { inputValue, setInputValue, handleInputChange } = useInput(initialState);

    useEffect(() => {
        dispatch(setAdminLoadingState(LoadingStatus.LOADED));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);

    useEffect(() => {
        if (isPerfumeAdded) {
            setInputValue(initialState);
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                dispatch(resetAdminState(LoadingStatus.LOADING));
            }, 5000);
            window.scrollTo(0, 0);
        }
    }, [isPerfumeAdded]);

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const bodyFormData: FormData = new FormData();
        bodyFormData.append("file", inputValue.file);
        bodyFormData.append(
            "perfume",
            new Blob(
                [
                    JSON.stringify({
                        perfumeTitle: inputValue.perfumeTitle,
                        perfumer: inputValue.perfumer,
                        year: inputValue.year,
                        country: inputValue.country,
                        type: inputValue.type,
                        volume: inputValue.volume,
                        perfumeGender: inputValue.perfumeGender,
                        fragranceTopNotes: inputValue.fragranceTopNotes,
                        fragranceMiddleNotes: inputValue.fragranceMiddleNotes,
                        fragranceBaseNotes: inputValue.fragranceBaseNotes,
                        price: inputValue.price,
                        perfumeRating: inputValue.perfumeRating
                    })
                ],
                { type: "application/json" }
            )
        );

        dispatch(addPerfume(bodyFormData));
    };

    const handleFileChange = (event: any): void => {
        setInputValue((prevState: any) => ({ ...prevState, file: event.target.files[0] }));
    };

    return (
        <>
            <ToastShow showToast={showToast} message={"Perfume successfully added!"} />
            <div className="container">
                <InfoTitle iconClass={"mr-2"} icon={faPlusSquare} title={"Add perfume"} />
                <br />
                <form onSubmit={onFormSubmit}>
                    <div className="form row">
                        <Input
                            column={true}
                            type={"text"}
                            title={"Perfume title"}
                            error={errors.perfumeTitleError}
                            name={"perfumeTitle"}
                            value={inputValue.perfumeTitle}
                            placeholder={"Enter the perfume title"}
                            disabled={isLoading}
                            onChange={handleInputChange}
                        />
                        <Input
                            column={true}
                            type={"text"}
                            title={"Brand"}
                            error={errors.perfumerError}
                            name={"perfumer"}
                            value={inputValue.perfumer}
                            placeholder={"Enter the brand"}
                            disabled={isLoading}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form row mt-3">
                        <Input
                            column={true}
                            type={"text"}
                            title={"Release year"}
                            error={errors.yearError}
                            name={"year"}
                            value={inputValue.year}
                            placeholder={"Enter the release year"}
                            disabled={isLoading}
                            onChange={handleInputChange}
                        />
                        <Input
                            column={true}
                            type={"text"}
                            title={"Manufacturer country"}
                            error={errors.countryError}
                            name={"country"}
                            value={inputValue.country}
                            placeholder={"Enter the manufacturer country"}
                            disabled={isLoading}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form row mt-3">
                        <AddPerfumeSelect
                            title={"Perfume type"}
                            error={errors.typeError}
                            name={"type"}
                            values={["Eau de Parfum", "Eau de Toilette"]}
                            disabled={isLoading}
                            onChange={handleInputChange}
                        />
                        <Input
                            column={true}
                            type={"text"}
                            title={"Volume"}
                            error={errors.volumeError}
                            name={"volume"}
                            value={inputValue.volume}
                            placeholder={"Enter the volume"}
                            disabled={isLoading}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form row mt-3">
                        <AddPerfumeSelect
                            title={"Gender"}
                            error={errors.perfumeGenderError}
                            name={"perfumeGender"}
                            values={["male", "female"]}
                            disabled={isLoading}
                            onChange={handleInputChange}
                        />
                        <Input
                            column={true}
                            type={"text"}
                            title={"Top notes"}
                            error={errors.fragranceTopNotesError}
                            name={"fragranceTopNotes"}
                            value={inputValue.fragranceTopNotes}
                            placeholder={"Enter the top notes"}
                            disabled={isLoading}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form row mt-3">
                        <Input
                            column={true}
                            type={"text"}
                            title={"Heart notes"}
                            error={errors.fragranceMiddleNotesError}
                            name={"fragranceMiddleNotes"}
                            value={inputValue.fragranceMiddleNotes}
                            placeholder={"Enter the heart notes"}
                            disabled={isLoading}
                            onChange={handleInputChange}
                        />
                        <Input
                            column={true}
                            type={"text"}
                            title={"Base notes"}
                            error={errors.fragranceBaseNotesError}
                            name={"fragranceBaseNotes"}
                            value={inputValue.fragranceBaseNotes}
                            placeholder={"Enter the base notes"}
                            disabled={isLoading}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form row mt-3">
                        <Input
                            column={true}
                            type={"text"}
                            title={"Price"}
                            error={errors.priceError}
                            name={"price"}
                            value={inputValue.price}
                            placeholder={"Enter the price"}
                            disabled={isLoading}
                            onChange={handleInputChange}
                        />
                        <div className="col" style={{ marginTop: "35px" }}>
                            <input type="file" name="file" onChange={handleFileChange} />
                        </div>
                    </div>
                    <IconButton
                        buttonText={"Add"}
                        buttonClassName={"mt-3"}
                        icon={faPlusSquare}
                        iconClassName={"mr-2"}
                        disabled={isLoading}
                    />
                </form>
            </div>
        </>
    );
};

export default AddPerfume;
