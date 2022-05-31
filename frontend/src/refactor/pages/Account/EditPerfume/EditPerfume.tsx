import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload/interface";

import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import FormInput from "../../../components/FormInput/FormInput";
import { selectIsPerfumeLoaded, selectPerfume } from "../../../../redux-toolkit/perfume/perfume-selector";
import {
    selectAdminStateErrors,
    selectIsAdminStateLoading,
    selectIsPerfumeEdited
} from "../../../../redux-toolkit/admin/admin-selector";
import { LoadingStatus } from "../../../../types/types";
import { resetAdminState, setAdminLoadingState } from "../../../../redux-toolkit/admin/admin-slice";
import { fetchPerfume } from "../../../../redux-toolkit/perfume/perfume-thunks";
import IconButton from "../../../components/IconButton/IconButton";
import "./EditPerfume.css";
import EditPerfumeSelect from "./EditPerfumeSelect";

const EditPerfume: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const params = useParams<{ id: string }>();
    const perfumeData = useSelector(selectPerfume);
    const isPerfumeLoaded = useSelector(selectIsPerfumeLoaded);
    const isLoading = useSelector(selectIsAdminStateLoading);
    const errors = useSelector(selectAdminStateErrors);
    const isPerfumeEdited = useSelector(selectIsPerfumeEdited);
    const [file, setFile] = React.useState<string>("");

    useEffect(() => {
        dispatch(setAdminLoadingState(LoadingStatus.LOADED));
        dispatch(fetchPerfume(params.id));

        if (perfumeData) {
            form.setFieldsValue(perfumeData);
        }

        return () => {
            dispatch(resetAdminState());
        };
    }, []);

    const handleUpload = ({ file }: UploadChangeParam<any>) => {
        setFile(file);
    };

    return (
        <div>
            <ContentTitle title={"Edit perfume"} titleLevel={4} icon={<EditOutlined />} />
            <Form form={form}>
                <Row gutter={32}>
                    <Col span={12}>
                        <FormInput
                            title={"Perfume title"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"perfumeTitle"}
                            error={errors.perfumeTitleError}
                            disabled={isLoading}
                            placeholder={"Perfume title"}
                        />
                        <FormInput
                            title={"Brand"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"perfumer"}
                            error={errors.perfumerError}
                            disabled={isLoading}
                            placeholder={"Brand"}
                        />
                        <FormInput
                            title={"Release year"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"year"}
                            error={errors.yearError}
                            disabled={isLoading}
                            placeholder={"Release year"}
                        />
                        <FormInput
                            title={"Country"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"country"}
                            error={errors.countryError}
                            disabled={isLoading}
                            placeholder={"Country"}
                        />
                        <FormInput
                            title={"Country"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"country"}
                            error={errors.countryError}
                            disabled={isLoading}
                            placeholder={"Country"}
                        />
                        <EditPerfumeSelect 
                            title={"Perfume type"} 
                            name={"type"} 
                            placeholder={"Perfume type"}
                            error={errors.typeError}
                            disabled={isLoading}
                            values={["Eau de Parfum", "Eau de Toilette"]}
                        />
                        <EditPerfumeSelect
                            title={"Gender"}
                            name={"perfumeGender"}
                            placeholder={"Gender"}
                            disabled={isLoading}
                            values={["male", "female"]}
                        />
                        <FormInput
                            title={"Volume"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"volume"}
                            error={errors.volumeError}
                            disabled={isLoading}
                            placeholder={"Volume"}
                        />
                        <FormInput
                            title={"Top notes"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"fragranceTopNotes"}
                            error={errors.fragranceTopNotesError}
                            disabled={isLoading}
                            placeholder={"Top notes"}
                        />
                        <FormInput
                            title={"Heart notes"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"fragranceMiddleNotes"}
                            error={errors.fragranceMiddleNotesError}
                            disabled={isLoading}
                            placeholder={"Heart notes"}
                        />
                        <FormInput
                            title={"Base notes"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"fragranceBaseNotes"}
                            error={errors.fragranceBaseNotesError}
                            disabled={isLoading}
                            placeholder={"Base notes"}
                        />
                        <FormInput
                            title={"Price"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"price"}
                            error={errors.priceError}
                            disabled={isLoading}
                            placeholder={"Price"}
                        />
                    </Col>
                    <Col span={12}>
                        <Upload name={"file"} onChange={handleUpload} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>
                                Click to Upload
                            </Button>
                        </Upload>
                        <div className={"edit-perfume-image-wrapper"}>
                            <img className={"edit-perfume-image"} src={"https://u.makeup.com.ua/x/xy/xyebkcb386lw.jpg"} />
                        </div>
                    </Col>
                </Row>
                <IconButton title={"Edit"} icon={<EditOutlined />} />
            </Form>
        </div>
    );
};

export default EditPerfume;
