import React, { FC, ReactElement } from "react";
import { Select } from "antd";

const searchByData = [
    { label: "Brand", value: "perfumer" },
    { label: "Perfume title", value: "perfumeTitle" },
    { label: "Manufacturer country", value: "country" }
];

type PropsType = {
    handleChangeSelect: (value: string) => void;
};

const SelectSearchData: FC<PropsType> = ({ handleChangeSelect }): ReactElement => {
    return (
        <Select defaultValue="Brand" onChange={handleChangeSelect} style={{ width: 250 }}>
            {searchByData.map((value, index) => (
                <Select.Option key={index} value={value.value}>
                    {value.label}
                </Select.Option>
            ))}
        </Select>
    );
};

export default SelectSearchData;
