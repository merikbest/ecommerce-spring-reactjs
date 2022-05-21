import React, { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import { fetchPerfumes } from "../../../redux/perfumes/perfumes-thunks";
import { updatePerfume } from "../../../redux/admin/admin-thunks";
import { Perfume } from "../../../types/types";
import ToastShow from "../../../component/Toasts/ToastShow";
import InfoTitle from "../../../component/InfoTitle/InfoTitle";
import IconButton from "../../../component/IconButton/IconButton";
import EditPerfumeSelect from "./EditPerfumeSelect/EditPerfumeSelect";
import Input from "../../../component/EditInput/Input";
import { selectPerfume } from "../../../redux/perfume/perfume-selector";
import { fetchPerfume } from "../../../redux/perfume/perfume-thunks";
import { selectAdminStateErrors, selectIsPerfumeEdited } from "../../../redux/admin/admin-selector";
import { formReset } from "../../../redux/admin/admin-actions";

const EditPerfume: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const perfumeData = useSelector(selectPerfume);
    const errors = useSelector(selectAdminStateErrors);
    const isPerfumeEdited = useSelector(selectIsPerfumeEdited);
    const [perfume, setPerfume] = useState<Partial<Perfume> | undefined>(undefined);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        dispatch(fetchPerfume(params.id));
        setPerfume(perfumeData);
    }, []);

    useEffect(() => {
        setPerfume(perfumeData);
        if (isPerfumeEdited) {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                dispatch(formReset());
            }, 5000);
            window.scrollTo(0, 0);
            dispatch(fetchPerfumes());
        }
    }, [perfumeData]);

    const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const bodyFormData: FormData = new FormData();
        bodyFormData.append("file", perfume?.file);
        bodyFormData.append(
            "perfume",
            new Blob(
                [
                    JSON.stringify({
                        id: perfume?.id,
                        perfumeTitle: perfume?.perfumeTitle,
                        perfumer: perfume?.perfumer,
                        year: perfume?.year,
                        country: perfume?.country,
                        type: perfume?.type,
                        volume: perfume?.volume,
                        perfumeGender: perfume?.perfumeGender,
                        fragranceTopNotes: perfume?.fragranceTopNotes,
                        fragranceMiddleNotes: perfume?.fragranceMiddleNotes,
                        fragranceBaseNotes: perfume?.fragranceBaseNotes,
                        filename: perfume?.filename,
                        price: perfume?.price
                    })
                ],
                { type: "application/json" }
            )
        );

        dispatch(updatePerfume(bodyFormData));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, files } = event.target;
        if (files) {
            setPerfume({ ...perfume, [name]: files[0] });
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = event.target;
        setPerfume({ ...perfume, [name]: value });
    };

    return (
        <>
            <ToastShow showToast={showToast} message={"Perfume successfully edited!"} />
            <div className="container">
                <InfoTitle iconClass={"mr-2"} icon={faEdit} title={"Edit perfume"} />
                <form onSubmit={onFormSubmit}>
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <Input
                                title={"Perfume title"}
                                titleClass={"col-sm-4 font-weight-bold"}
                                wrapperClass={"col-sm-8"}
                                type={"text"}
                                error={errors.perfumeTitleError}
                                name={"perfumeTitle"}
                                value={perfume?.perfumeTitle}
                                onChange={handleInputChange}
                            />
                            <Input
                                title={"Brand"}
                                titleClass={"col-sm-4 font-weight-bold"}
                                wrapperClass={"col-sm-8"}
                                type={"text"}
                                error={errors.perfumerError}
                                name={"perfumer"}
                                value={perfume?.perfumer}
                                onChange={handleInputChange}
                            />
                            <Input
                                title={"Release year"}
                                titleClass={"col-sm-4 font-weight-bold"}
                                wrapperClass={"col-sm-8"}
                                type={"text"}
                                error={errors.yearError}
                                name={"year"}
                                value={perfume?.year}
                                onChange={handleInputChange}
                            />
                            <Input
                                title={"Country"}
                                titleClass={"col-sm-4 font-weight-bold"}
                                wrapperClass={"col-sm-8"}
                                type={"text"}
                                error={errors.countryError}
                                name={"country"}
                                value={perfume?.country}
                                onChange={handleInputChange}
                            />
                            <EditPerfumeSelect
                                title={"Perfume type"}
                                error={errors.typeError}
                                name={"type"}
                                onChange={handleInputChange}
                                selectOptions={
                                    perfumeData.type === "Eau de Parfum" ? (
                                        <>
                                            <option value={perfumeData.type}>{perfumeData.type}</option>
                                            <option value="Eau de Toilette">Eau de Toilette</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value={perfumeData.type}>{perfumeData.type}</option>
                                            <option value="Eau de Parfum">Eau de Parfum</option>
                                        </>
                                    )
                                }
                            />
                            <Input
                                title={"Volume"}
                                titleClass={"col-sm-4 font-weight-bold"}
                                wrapperClass={"col-sm-8"}
                                type={"text"}
                                error={errors.volumeError}
                                name={"volume"}
                                value={perfume?.volume}
                                onChange={handleInputChange}
                            />
                            <EditPerfumeSelect
                                title={"Gender"}
                                error={errors.perfumeGenderError}
                                name={"perfumeGender"}
                                onChange={handleInputChange}
                                selectOptions={
                                    perfumeData.perfumeGender === "male" ? (
                                        <>
                                            <option value={perfumeData.perfumeGender}>
                                                {perfumeData.perfumeGender}
                                            </option>
                                            <option value="female">female</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value={perfumeData.perfumeGender}>
                                                {perfumeData.perfumeGender}
                                            </option>
                                            <option value="male">male</option>
                                        </>
                                    )
                                }
                            />
                            <Input
                                title={"Top notes"}
                                titleClass={"col-sm-4 font-weight-bold"}
                                wrapperClass={"col-sm-8"}
                                type={"text"}
                                error={errors.fragranceTopNotesError}
                                name={"fragranceTopNotes"}
                                value={perfume?.fragranceTopNotes}
                                onChange={handleInputChange}
                            />
                            <Input
                                title={"Heart notes"}
                                titleClass={"col-sm-4 font-weight-bold"}
                                wrapperClass={"col-sm-8"}
                                type={"text"}
                                error={errors.fragranceMiddleNotesError}
                                name={"fragranceMiddleNotes"}
                                value={perfume?.fragranceMiddleNotes}
                                onChange={handleInputChange}
                            />
                            <Input
                                title={"Base notes"}
                                titleClass={"col-sm-4 font-weight-bold"}
                                wrapperClass={"col-sm-8"}
                                type={"text"}
                                error={errors.fragranceBaseNotesError}
                                name={"fragranceBaseNotes"}
                                value={perfume?.fragranceBaseNotes}
                                onChange={handleInputChange}
                            />
                            <Input
                                title={"Price"}
                                titleClass={"col-sm-4 font-weight-bold"}
                                wrapperClass={"col-sm-8"}
                                type={"text"}
                                error={errors.priceError}
                                name={"price"}
                                value={perfume?.price}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <img src={perfume?.filename} className="rounded mx-auto w-100 mb-2" />
                            <input type="file" name="file" onChange={handleFileChange} />
                        </div>
                    </div>
                    <IconButton buttonText={"Edit"} icon={faEdit} iconClassName={"mr-2"} />
                </form>
            </div>
        </>
    );
};

export default EditPerfume;
