import React, { FC, ReactElement } from "react";
import { Col, Modal, Row, Typography } from "antd";

import { PerfumeResponse } from "../../../../types/types";
import "./DeleteModal.css";

type PropsType = {
    visible: boolean;
    deletePerfumeHandler: () => void;
    handleCancel: () => void;
    perfumeInfo?: PerfumeResponse;
};

const DeleteModal: FC<PropsType> = ({ visible, deletePerfumeHandler, handleCancel, perfumeInfo }): ReactElement => {
    return (
        <Modal title="Delete perfume" visible={visible} onOk={deletePerfumeHandler} onCancel={handleCancel}>
            <Row>
                <Col span={12} className={"delete-modal-perfume-image-wrapper"}>
                    <img
                        className={"delete-modal-perfume-image"}
                        alt={perfumeInfo?.perfumeTitle}
                        src={perfumeInfo?.filename}
                    />
                </Col>
                <Col span={12}>
                    <Typography.Text>Are you sure too delete?</Typography.Text>
                    <Typography.Title level={5}>{perfumeInfo?.perfumer}</Typography.Title>
                    <Typography.Title level={5}>{perfumeInfo?.perfumeTitle}</Typography.Title>
                </Col>
            </Row>
        </Modal>
    );
};

export default DeleteModal;
