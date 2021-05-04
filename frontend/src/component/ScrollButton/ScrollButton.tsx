import React from 'react';
import ScrollToTop from "react-scroll-up";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleUp} from "@fortawesome/free-solid-svg-icons";

const ScrollButton = () => {
    return (
        <ScrollToTop style={{right: 60, color: "grey", zIndex: 1}} showUnder={160}>
            <FontAwesomeIcon className="fa-3x" icon={faArrowAltCircleUp}/>
        </ScrollToTop>
    );
};

export default ScrollButton;
