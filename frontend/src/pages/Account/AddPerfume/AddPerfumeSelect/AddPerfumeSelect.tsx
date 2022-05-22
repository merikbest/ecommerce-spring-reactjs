import React, { ChangeEvent, FC, ReactElement } from "react";

type PropsType = {
    title: string;
    error?: string;
    name: string;
    values: string[];
    disabled?: boolean;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const AddPerfumeSelect: FC<PropsType> = ({ title, error, name, values, disabled, onChange }): ReactElement => {
    return (
        <div className="col">
            <label>{`${title}: `}</label>
            <select
                name={name}
                className={error ? "form-control is-invalid" : "form-control"}
                disabled={disabled}
                onChange={onChange}
            >
                <option hidden={true} value=""></option>
                {values.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <div className="invalid-feedback">{error}</div>
        </div>
    );
};

export default AddPerfumeSelect;
