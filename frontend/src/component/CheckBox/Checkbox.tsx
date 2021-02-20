import React, {FC, useState} from 'react'
import "../../pages/Menu/MenuStyle.css";

type PropsType = {
    handleFilters: (filters: Array<string>) => void
    list: Array<{ name: string }>
};

const CheckBox: FC<PropsType> = ({handleFilters, list}) => {
    const [checked, setChecked] = useState<Array<string>>([]);

    const handleToggle = (value: string): void => {
        const currentIndex: number = checked.indexOf(value);
        const newChecked: Array<string> = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        handleFilters(newChecked)
    };

    const renderCheckboxLists = () => list && list.map((value: { name: string }, index: number) => (
        <li key={index}>
            <div className="checkbox ml-3">
                <label>
                    <input
                        onChange={() => handleToggle(value.name)}
                        type="checkbox"
                        checked={checked.indexOf(value.name) !== -1}/>
                    <span className="cr">
                        <i className="cr-icon fas fa-check"></i></span>
                    {value.name}
                </label>
            </div>
        </li>
    ));

    return (
        <ul className="list-unstyled">
            {renderCheckboxLists()}
        </ul>
    );
};

export default CheckBox
