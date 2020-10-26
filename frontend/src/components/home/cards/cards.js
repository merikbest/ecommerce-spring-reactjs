import React, {Component} from 'react';

class Cards extends Component {

    render() {

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card mb-5">
                            <a href={`/menu/gender/женский`}>
                                <img className="img-fluid"
                                     src="https://i.ibb.co/ZKt4GQy/Brocard-UA-Thems-1-880x352-RUS.jpg"/>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card mb-5">
                            <a href={`/menu/gender/мужской`}>
                                <img className="img-fluid"
                                     src="https://i.ibb.co/GVczwGS/Brocard-UA-Thems-2-880x352-RUS.jpg"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cards;