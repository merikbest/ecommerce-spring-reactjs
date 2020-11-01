import React, {useState} from 'react';

function RadioCheckbox(props) {

    const [Value, setValue] = useState('0');

    const renderRadioBox = () => (
        props.list && props.list.map((value) => (
            <div className="checkbox ml-3">
                <label>
                    <input
                        key={value.id}
                        type="radio"
                        name="price"
                        value={`${value.id}`}
                    />
                    <span className="cr"><i className="cr-icon fas fa-check"></i></span>
                    {value.name}
                </label>
            </div>
        ))
    )

    const handleChange = (event) => {
        setValue(event.target.value)
        props.handleFilters(event.target.value)
    }

    return (
        <ul className="list-unstyled">
            <li onChange={handleChange} value={Value}>
                {renderRadioBox()}
            </li>
        </ul>
    );
}

export default RadioCheckbox;