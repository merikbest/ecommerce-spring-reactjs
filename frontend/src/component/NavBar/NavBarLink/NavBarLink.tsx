import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

type PropsType = {
    path: string;
    title: string;
    linkClass?: string;
    icon?: IconDefinition;
};

const NavBarLink: FC<PropsType> = ({ path, title, linkClass, icon }): ReactElement => {
    return (
        <li className="nav-item">
            <Link to={path} className={`nav-link ${linkClass}`}>
                {icon && <FontAwesomeIcon className="mr-2" icon={icon} />}
                {title}
            </Link>
        </li>
    );
};

export default NavBarLink;
