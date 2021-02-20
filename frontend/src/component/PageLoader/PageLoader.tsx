import React, {FC} from 'react';

import Spinner from "../Spinner/Spinner";
import "./PageLoader.css";

const PageLoader: FC = () => {
    return (
        <div className="loader-container">
            <div className="loader">
                <Spinner/>
            </div>
        </div>
    );
};

export default PageLoader;
