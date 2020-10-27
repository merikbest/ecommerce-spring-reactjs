import React from 'react'

const Input = (props) => {
    const {label, error, name, valueName, onChangeData, type} = props;
    const className = error ? "form-control is-invalid" : "form-control";

    return (
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">{label}</label>
            <div className="col-sm-6">
                <input
                    type={type} className={className}
                    name={name}
                    onChange={e => onChangeData(name, e.target.value)}
                    value={valueName} />
                <div className="invalid-feedback">{error}</div>
            </div>
        </div>
    );
}

export default Input;