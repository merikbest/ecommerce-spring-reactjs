import React, { ChangeEvent, FC, ReactElement } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PropsType = {
    title: string;
    titleClass?: string;
    column?: boolean;
    wrapperClass?: string;
    icon?: IconDefinition;
    type: string;
    error?: string;
    name: string;
    value?: string | number;
    placeholder?: string;
    disabled?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<PropsType> = ({
    title,
    titleClass,
    column,
    wrapperClass,
    icon,
    type,
    error,
    name,
    value,
    placeholder,
    disabled,
    onChange
}): ReactElement => {
    return (
        <div className={column ? "col" : "form-group row"}>
            <label className={`${titleClass} `}>{`${title}: `}</label>
            {icon && <FontAwesomeIcon style={{ position: "relative", top: "8px" }} icon={icon} />}
            <div className={wrapperClass}>
                <input
                    type={type}
                    name={name}
                    className={error ? "form-control is-invalid" : "form-control"}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={onChange}
                />
                <div className="invalid-feedback">{error}</div>
            </div>
        </div>
    );
};

export default Input;
