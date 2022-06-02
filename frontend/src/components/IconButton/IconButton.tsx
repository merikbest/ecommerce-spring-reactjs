import React, { FC, ReactElement, ReactNode } from "react";
import { Button } from "antd";

type PropsType = {
    title: string;
    icon: ReactNode;
    disabled?: boolean;
};

const IconButton: FC<PropsType> = ({ title, icon, disabled }): ReactElement => {
    return (
        <Button type="primary" htmlType="submit" icon={icon} disabled={disabled}>
            {title}
        </Button>
    );
};

export default IconButton;
