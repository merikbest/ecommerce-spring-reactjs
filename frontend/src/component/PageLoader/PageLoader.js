import React, {Component} from 'react';

import Spinner from "../Spinner/Spinner";
import "./PageLoader.css";

class PageLoader extends Component {

    render() {
        return (
            <div className="loader-container">
                <div className="loader">
                    <Spinner/>
                </div>
            </div>
        );
    }
}

export default PageLoader;
