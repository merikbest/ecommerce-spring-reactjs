import React, {ChangeEvent, FC, ReactElement} from "react";

type PropsType = {
    title: string;
    error?: string;
    name: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    selectOptions: ReactElement;
};

const EditPerfumeSelect: FC<PropsType> = ({title, error, name, onChange, selectOptions}): ReactElement => {
    return (
        <div className="form-group row">
            <label className="col-sm-4 col-form-label font-weight-bold">
                {`${title}: `}
            </label>
            <div className="col-sm-8">
                <select
                    name={name}
                    className={error ? "form-control is-invalid" : "form-control"}
                    onChange={onChange}
                >
                    {selectOptions}
                </select>
                <div className="invalid-feedback">
                    {error}
                </div>
            </div>
        </div>
    );
};

export default EditPerfumeSelect;
