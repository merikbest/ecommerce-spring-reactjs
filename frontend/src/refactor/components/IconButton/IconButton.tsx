import React, { FC, ReactElement, ReactNode } from "react";
import { Button } from "antd";

import "./IconButton.css";

type PropsType = {
    title: string;
    icon: ReactNode;
};

const IconButton: FC<PropsType> = ({ title, icon }): ReactElement => {
    return (
        <Button type="primary" htmlType="submit" icon={icon}>
            {title}
        </Button>
    );
};

export default IconButton;
