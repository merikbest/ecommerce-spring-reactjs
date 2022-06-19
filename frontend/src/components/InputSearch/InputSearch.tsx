import React, { FC, ReactElement } from "react";
import { Form, FormInstance, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import IconButton from "../IconButton/IconButton";

type PropsType = {
    onSearch: (data: { searchValue: string }) => void;
    form?: FormInstance<{ searchValue: string }>;
};

const InputSearch: FC<PropsType> = ({ onSearch, form }): ReactElement => {
    return (
        <Form onFinish={onSearch} form={form}>
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
