import React, { FC, ReactElement } from "react";
import { Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import IconButton from "../IconButton/IconButton";

type PropsType = {
    onSearch: () => void;
};

const InputSearch: FC<PropsType> = ({ onSearch }): ReactElement => {
    return (
        <Form onFinish={onSearch}>
            <Input.Group compact>
                <Input style={{ width: "calc(100% - 100px)" }} placeholder={"Search..."} />
                <IconButton title={"Search"} icon={<SearchOutlined />} />
            </Input.Group>
        </Form>
    );
};

export default InputSearch;
