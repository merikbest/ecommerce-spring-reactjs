import React, { FC, ReactElement } from "react";
import { Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import IconButton from "../IconButton/IconButton";

type PropsType = {
    onSearch: (data: { searchValue: string }) => void;
};

const InputSearch: FC<PropsType> = ({ onSearch }): ReactElement => {
    return (
        <Form onFinish={onSearch}>
            <Input.Group compact>
                <Form.Item name={"searchValue"}>
                    <Input placeholder={"Search..."} />
                </Form.Item>
                <IconButton title={"Search"} icon={<SearchOutlined />} />
            </Input.Group>
        </Form>
    );
};

export default InputSearch;
