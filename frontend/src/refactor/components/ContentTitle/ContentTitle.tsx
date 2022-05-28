import React, {FC, ReactElement, ReactNode} from "react";
import { Space, Typography } from "antd";

import "./ContentTitle.css";

type PropsType = {
    icon: ReactNode;
    title: string;
};

const ContentTitle: FC<PropsType> = ({ icon, title }): ReactElement => {
    return (
        <Space align="center" className={"title-icon"}>
            {icon}
            <Typography.Title level={2}>{title}</Typography.Title>
        </Space>
    );
};

export default ContentTitle;
