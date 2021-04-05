import React, {FC} from 'react';
import {Toast} from "react-bootstrap";

import "./ToastShow.css";

type PropsType = {
    showToast: boolean,
    message: string
};

const ToastShow: FC<PropsType> = ({showToast, message}) => {
    return (
        <Toast className={"border border-success bg-success text white"} show={showToast}>
            <Toast.Header className={"bg-success text-white"} closeButton={false}>
                <strong className="mr-auto">Success</strong>
            </Toast.Header>
            <Toast.Body className={"text-white"}>
                {message}
            </Toast.Body>
        </Toast>
    );
}

export default ToastShow;
