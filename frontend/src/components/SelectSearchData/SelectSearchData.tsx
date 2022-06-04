import React, { FC, ReactElement } from "react";
import { Select } from "antd";
import {SearchPerfume} from "../../types/types";

const searchByData = [
    { label: "Brand", value: SearchPerfume.BRAND },
    { label: "Perfume title", value: SearchPerfume.PERFUME_TITLE },
    { label: "Manufacturer country", value: SearchPerfume.COUNTRY }
];

type PropsType = {
    handleChangeSelect: (value: SearchPerfume) => void;
};

const SelectSearchData: FC<PropsType> = ({ handleChangeSelect }): ReactElement => {
    return (
        <Select defaultValue={SearchPerfume.BRAND} onChange={handleChangeSelect} style={{ width: 250 }}>
            {searchByData.map((value, index) => (
                <Select.Option key={index} value={value.value}>
                    {value.label}
                </Select.Option>
            ))}
        </Select>
    );
};

export default SelectSearchData;
