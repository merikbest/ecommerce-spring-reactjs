import React, {FC, ReactElement} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";

type PropsType = {
    sortByPrice: boolean | undefined;
    sortedBy: boolean;
    icon: IconDefinition;
    handleSortByPrice: (sortedBy: boolean, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const SortButton: FC<PropsType> = ({sortByPrice, sortedBy, icon, handleSortByPrice}): ReactElement => {
    return (
        <li className={sortByPrice ? "page-item active" : "page-item"}>
            <a
                className={sortByPrice ?
                    "page-link border-dark bg-light text-dark" :
                    "page-link border-dark bg-dark text-light"}
                onClick={(event) => handleSortByPrice(sortedBy, event)}
            >
                <FontAwesomeIcon className="fa-sm" icon={icon}/>
            </a>
        </li>
    );
};

export default SortButton;