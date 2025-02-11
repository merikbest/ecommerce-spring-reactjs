import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, notification, Row, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload/interface";

import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import FormInput from "../../../components/FormInput/FormInput";
import { selectPerfume } from "../../../redux-toolkit/perfume/perfume-selector";
import {
    selectAdminStateErrors,
    selectIsAdminStateLoading,
    selectIsPerfumeEdited
} from "../../../redux-toolkit/admin/admin-selector";
import { LoadingStatus } from "../../../types/types";
import { resetAdminState, setAdminLoadingState } from "../../../redux-toolkit/admin/admin-slice";
import { fetchPerfume } from "../../../redux-toolkit/perfume/perfume-thunks";
import IconButton from "../../../components/IconButton/IconButton";
import EditPerfumeSelect from "./EditPerfumeSelect";
import { updatePerfume } from "../../../redux-toolkit/admin/admin-thunks";
import "./EditPerfume.css";

type EditPerfumeData = {
    perfumeTitle: string;
    perfumer: string;
    year: string;
    country: string;
    type: string;
    volume: string;
    perfumeGender: string;
    fragranceTopNotes: string;
    fragranceMiddleNotes: string;
    fragranceBaseNotes: string;
    price: string;
};

const EditPerfume: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const params = useParams<{ id: string }>();
    const perfumeData = useSelector(selectPerfume);
    const isLoading = useSelector(selectIsAdminStateLoading);
    const errors = useSelector(selectAdminStateErrors);
    const isPerfumeEdited = useSelector(selectIsPerfumeEdited);
    const [file, setFile] = React.useState<string>("");

    useEffect(() => {
        dispatch(setAdminLoadingState(LoadingStatus.LOADED));
        dispatch(fetchPerfume(params.id));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);
    
    useEffect(() => {
        if (perfumeData) {
            form.setFieldsValue(perfumeData);
        }
    }, [perfumeData])

    useEffect(() => {
        if (isPerfumeEdited) {
            window.scrollTo(0, 0);
            notification.success({
                message: "Perfume edited",
                description: "Perfume successfully edited!"
            });
            dispatch(resetAdminState(LoadingStatus.SUCCESS));
        }
    }, [isPerfumeEdited]);

    const onFormSubmit = (data: EditPerfumeData): void => {
        data.perfumeGender = ('male');
        data.type = ('Eau de Parfum');
        data.fragranceTopNotes = ('fragranceTopNotes');
        data.fragranceBaseNotes = ('fragranceBaseNotes');

        const bodyFormData: FormData = new FormData();
        // @ts-ignore
          

        bodyFormData.append("file", { file });
        bodyFormData.append(
            "perfume",
            new Blob([JSON.stringify({ ...data, id: perfumeData?.id })], { type: "application/json" })
        );
            console.log(file);
            console.log(data);

        dispatch(updatePerfume(bodyFormData));
    };

    const handleUpload = ({ file }: UploadChangeParam<any>): void => {
        console.log(file)
        setFile(file);
    };

    return (
        <div>
            <ContentTitle title={"Промени Продукт"} titleLevel={4} icon={<EditOutlined />} />
            <Form onFinish={onFormSubmit} form={form}>
                <Row gutter={32}>
                    <Col span={12}>
                        <FormInput
                            title={"Име на продукта"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"perfumeTitle"}
                            error={errors.perfumeTitleError}
                            disabled={isLoading}
                            placeholder={"Име на продукта"}
                        />
                        <FormInput
                            title={"Описание"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"perfumer"}
                            error={errors.perfumerError}
                            disabled={isLoading}
                            placeholder={"Описание"}
                        />
                        <FormInput
                            title={"Година"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"year"}
                            error={errors.yearError}
                            disabled={isLoading}
                            placeholder={"Година"}
                        />
                        <FormInput
                            title={"Държава"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"country"}
                            error={errors.countryError}
                            disabled={isLoading}
                            placeholder={"Държава"}
                        />
                 
                        <FormInput
                            title={"Количество"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"volume"}
                            error={errors.volumeError}
                            disabled={isLoading}
                            placeholder={"Количество"}
                        />
                  
                        <FormInput
                            title={"Описание"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"fragranceMiddleNotes"}
                            error={errors.fragranceMiddleNotesError}
                            disabled={isLoading}
                            placeholder={"Описание"}
                        />
                       
                        <FormInput
                            title={"Цена"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"price"}
                            error={errors.priceError}
                            disabled={isLoading}
                            placeholder={"Цена"}
                        />
                    </Col>
                    <Col span={12}>
                        <Upload name={"file"} onChange={handleUpload} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        <div className={"edit-perfume-image-wrapper"}>
                            <img
                                className={"edit-perfume-image"}
                                src={perfumeData.filename}
                                alt={perfumeData.perfumeTitle}
                            />
                        </div>
                    </Col>
                </Row>
                <IconButton title={"Edit"} icon={<EditOutlined />} disabled={isLoading} />
            </Form>
        </div>
    );
};

export default EditPerfume;
