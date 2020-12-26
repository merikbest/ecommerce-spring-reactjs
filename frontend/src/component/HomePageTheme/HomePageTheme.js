import React from 'react';
import {Link} from "react-router-dom";

const HomePageTheme = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6">
                    <div className="card mb-5" >
                        <Link to={{pathname: "/menu", state: { id: "женский" }}}>
                            <img className="img-fluid" src="https://i.ibb.co/ZKt4GQy/Brocard-UA-Thems-1-880x352-RUS.jpg"/>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card mb-5">
                        <Link to={{pathname: "/menu", state: { id: "мужской" }}}>
                            <img className="img-fluid" src="https://i.ibb.co/GVczwGS/Brocard-UA-Thems-2-880x352-RUS.jpg"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePageTheme;