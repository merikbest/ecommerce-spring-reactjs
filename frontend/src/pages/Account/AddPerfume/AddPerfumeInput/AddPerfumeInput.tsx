import React, {ChangeEvent, FC, ReactElement} from 'react';

type PropsType = {
    title: string;
    error?: string;
    name: string;
    value: string;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
};

const AddPerfumeInput: FC<PropsType> = ({title, error, name, value, placeholder, onChange}): ReactElement => {
    return (
        <div className="col">
            <label>
                {`${title}: `}
            </label>
            <input
                type="text"
                className={error ? "form-control is-invalid" : "form-control"}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    );
};

export default AddPerfumeInput;