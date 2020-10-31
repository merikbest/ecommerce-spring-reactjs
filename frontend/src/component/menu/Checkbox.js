import React, {useState} from 'react'
import "./MenuStyle.css";

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)
        //update this checked information into Parent Component
    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <li key={index}>
            <div className="checkbox ml-3">
                <label>
                    <input
                        onChange={() => handleToggle(value.name)}
                        type="checkbox"
                        // name="perfumer"
                        checked={Checked.indexOf(value.name) === -1 ? false : true}
                    />
                    <span className="cr">
                        <i className="cr-icon fas fa-check"></i></span>
                    {value.name}
                </label>
            </div>
        </li>
    ))

    return (
        <ul className="list-unstyled" id="homeSubmenu2">
            {renderCheckboxLists()}
        </ul>
    )
}

export default CheckBox
