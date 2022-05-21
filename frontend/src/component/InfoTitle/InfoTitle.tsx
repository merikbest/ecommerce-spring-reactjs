import React, { FC, ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

type PropsType = {
    iconClass?: string;
    icon: IconDefinition;
    titleClass?: string;
    title: string;
};

const InfoTitle: FC<PropsType> = ({ iconClass, icon, titleClass, title }): ReactElement => {
    return (
        <h4 className={titleClass}>
            <FontAwesomeIcon className={iconClass} icon={icon} />
            {title}
        </h4>
    );
};

export default InfoTitle;