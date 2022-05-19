import React, {FC, ReactElement} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";

type PropsType = {
    buttonText: string;
    buttonClassName?: string;
    icon: IconDefinition;
    iconClassName: string;
    onClick?: any;
};

const IconButton: FC<PropsType> = ({buttonText, buttonClassName, icon, iconClassName, onClick}): ReactElement => {
    return (
        <button type="submit" className={`btn btn-dark ${buttonClassName}`} onClick={onClick}>
            <FontAwesomeIcon className={iconClassName} icon={icon}/>
            {buttonText}
        </button>
    );
};

export default IconButton;