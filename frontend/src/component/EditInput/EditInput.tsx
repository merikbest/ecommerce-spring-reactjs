import React, {ChangeEvent, FC, ReactElement} from 'react';

type PropsType = {
    title: string;
    titleClass: string;
    wrapperClass?: string;
    error?: string;
    name: string;
    value?: string | number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const EditInput: FC<PropsType> = ({title, titleClass, wrapperClass, error, name, value, onChange}): ReactElement => {
    return (
        <div className="form-group row">
            <label className={`${titleClass} col-form-label`}>
                {`${title}: `}
            </label>
            <div className={wrapperClass}>
                <input
                    type="text"
                    className={error ? "form-control is-invalid" : "form-control"}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                <div className="invalid-feedback">
                    {error}
                </div>
            </div>
        </div>
    );
};

export default EditInput;