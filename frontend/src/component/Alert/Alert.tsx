import React, { FC, ReactElement } from "react";

type PropsType = {
    alertType: string;
    message: string;
};

const Alert: FC<PropsType> = ({ alertType, message }): ReactElement => {
    return (
        <div className={`alert alert-${alertType} col-6`} role="alert">
            {message}
        </div>
    );
};

export default Alert;
