import React, { FC, ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

type PropsType = {
    buttonText: string;
    buttonClassName?: string;
    icon: IconDefinition;
    iconClassName: string;
    disabled?: boolean;
    onClick?: any;
};

const IconButton: FC<PropsType> = ({
    buttonText,
    buttonClassName,
    icon,
    iconClassName,
    disabled,
    onClick
}): ReactElement => {
    return (
        <button disabled={disabled} type="submit" className={`btn btn-dark ${buttonClassName}`} onClick={onClick}>
            <FontAwesomeIcon className={iconClassName} icon={icon} />
            {buttonText}
        </button>
    );
};

export default IconButton;
