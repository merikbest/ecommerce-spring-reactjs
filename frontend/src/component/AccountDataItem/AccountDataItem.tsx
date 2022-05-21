import React, { FC, ReactElement } from "react";

type PropsType = {
    title: string;
    text?: string | string[] | number;
};

const AccountDataItem: FC<PropsType> = ({ title, text }): ReactElement => {
    return (
        <p className="personal_data_item">
            {title}:<span className="personal_data_text">{text}</span>
        </p>
    );
};

export default AccountDataItem;
