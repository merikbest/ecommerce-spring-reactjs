import React, { FC, memo, ReactElement } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

type PropsType = {
    perfumeId: number;
    deleteFromCart: (perfumeId: number) => void;
};

const RemoveButton: FC<PropsType> = memo(({ perfumeId, deleteFromCart }): ReactElement => {

    return (
        <Button onClick={() => deleteFromCart(perfumeId)} icon={<CloseOutlined />}>
            Remove
        </Button>
    );
});

export default RemoveButton;
