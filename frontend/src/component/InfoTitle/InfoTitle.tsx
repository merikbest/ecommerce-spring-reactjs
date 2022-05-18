import React, {FC, ReactElement} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";

type PropsType = {
    className: string;
    icon: IconDefinition;
    title: string;
};

const InfoTitle: FC<PropsType> = ({className, icon, title}): ReactElement => {
    return (
        <h4>
            <FontAwesomeIcon className={className} icon={icon}/>
            {title}
        </h4>
    );
};

export default InfoTitle;