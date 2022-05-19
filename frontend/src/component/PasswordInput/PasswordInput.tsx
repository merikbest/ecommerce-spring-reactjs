import React, {FC, ReactElement} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";

type PropsType = {
    title: string;
    titleClass: string;
    wrapperClass?: string;
    icon?: IconDefinition;
    type: string;
    error?: string;
    name: string;
    value?: string;
    placeholder?: string;
    onChange: (value: (((prevState: string | undefined) => string) | string)) => void;
};

const PasswordInput: FC<PropsType> = (
    {
        title,
        titleClass,
        wrapperClass,
        icon,
        type,
        error,
        name,
        value,
        placeholder,
        onChange
    }
): ReactElement => {
    return (
        <div className="form-group row">
            <label className={`${titleClass} col-form-label`}>
                {`${title}: `}
            </label>
            {icon && <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={icon}/>}
            <div className={wrapperClass ? wrapperClass : "col-sm-4"}>
                <input
                    type={type}
                    name={name}
                    className={error ? "form-control is-invalid" : "form-control"}
                    value={value}
                    placeholder={placeholder}
                    onChange={(event) => onChange(event.target.value)}
                />
                <div className="invalid-feedback">
                    {error}
                </div>
            </div>
        </div>
    );
};

export default PasswordInput;